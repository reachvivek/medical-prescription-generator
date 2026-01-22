import { create } from 'zustand';
import { supabase } from '../services/supabase';

const initialPrescription = {
  step: 1,
  doctorDetails: {},
  patientDetails: {},
  medications: [],
  diagnosis: '',
  symptoms: '',
  labTests: [],
  followUpDate: null,
  additionalNotes: '',
  customFields: [],
};

const usePrescriptionStore = create((set, get) => ({
  currentPrescription: { ...initialPrescription },
  prescriptions: [],
  loading: false,
  error: null,

  // Set current step
  setStep: (step) =>
    set((state) => ({
      currentPrescription: { ...state.currentPrescription, step },
    })),

  // Update doctor details
  updateDoctorDetails: (details) =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        doctorDetails: { ...state.currentPrescription.doctorDetails, ...details },
      },
    })),

  // Update patient details
  updatePatientDetails: (details) =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        patientDetails: { ...state.currentPrescription.patientDetails, ...details },
      },
    })),

  // Add medication
  addMedication: (medication) =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        medications: [...state.currentPrescription.medications, medication],
      },
    })),

  // Update medication
  updateMedication: (index, medication) =>
    set((state) => {
      const medications = [...state.currentPrescription.medications];
      medications[index] = { ...medications[index], ...medication };
      return {
        currentPrescription: { ...state.currentPrescription, medications },
      };
    }),

  // Remove medication
  removeMedication: (index) =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        medications: state.currentPrescription.medications.filter(
          (_, i) => i !== index
        ),
      },
    })),

  // Update prescription content
  updatePrescriptionContent: (content) =>
    set((state) => ({
      currentPrescription: { ...state.currentPrescription, ...content },
    })),

  // Add custom field
  addCustomField: () =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        customFields: [
          ...state.currentPrescription.customFields,
          { label: '', value: '' },
        ],
      },
    })),

  // Update custom field
  updateCustomField: (index, field) =>
    set((state) => {
      const customFields = [...state.currentPrescription.customFields];
      customFields[index] = { ...customFields[index], ...field };
      return {
        currentPrescription: { ...state.currentPrescription, customFields },
      };
    }),

  // Remove custom field
  removeCustomField: (index) =>
    set((state) => ({
      currentPrescription: {
        ...state.currentPrescription,
        customFields: state.currentPrescription.customFields.filter(
          (_, i) => i !== index
        ),
      },
    })),

  // Save prescription to Supabase
  savePrescription: async (userId, status = 'completed') => {
    try {
      set({ loading: true, error: null });

      const { currentPrescription } = get();
      const {
        doctorDetails,
        patientDetails,
        medications,
        diagnosis,
        symptoms,
        labTests,
        followUpDate,
        additionalNotes,
        customFields,
      } = currentPrescription;

      // Insert prescription
      const { data: prescription, error: prescriptionError } = await supabase
        .from('prescriptions')
        .insert([
          {
            doctor_id: userId,
            doctor_name: doctorDetails.fullName,
            doctor_specialty: doctorDetails.specialty,
            doctor_clinic: doctorDetails.clinicHospitalName,
            doctor_license: doctorDetails.licenseNumber,
            doctor_address: doctorDetails.address,
            doctor_phone: doctorDetails.phone,
            patient_name: patientDetails.name,
            patient_age: patientDetails.age || null,
            patient_gender: patientDetails.gender,
            patient_contact: patientDetails.contact,
            patient_address: patientDetails.address,
            diagnosis,
            symptoms,
            lab_tests: labTests,
            follow_up_date: followUpDate,
            additional_notes: additionalNotes,
            custom_fields: customFields,
            status,
          },
        ])
        .select()
        .single();

      if (prescriptionError) throw prescriptionError;

      // Insert medications
      if (medications.length > 0) {
        const medicationsData = medications.map((med, index) => ({
          prescription_id: prescription.id,
          medication_name: med.medicationName,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
          instructions: med.instructions,
          sort_order: index,
        }));

        const { error: medsError } = await supabase
          .from('medications')
          .insert(medicationsData);

        if (medsError) throw medsError;
      }

      set({ loading: false });
      return { success: true, prescription };
    } catch (error) {
      console.error('Save prescription error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Fetch all prescriptions for a doctor
  fetchPrescriptions: async (userId, options = {}) => {
    try {
      set({ loading: true, error: null });

      let query = supabase
        .from('prescriptions')
        .select('*')
        .eq('doctor_id', userId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (options.status) {
        query = query.eq('status', options.status);
      }

      if (options.search) {
        query = query.ilike('patient_name', `%${options.search}%`);
      }

      // Apply pagination
      if (options.limit) {
        const from = options.offset || 0;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;

      set({ prescriptions: data, loading: false });
      return { success: true, prescriptions: data };
    } catch (error) {
      console.error('Fetch prescriptions error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Fetch single prescription with medications
  fetchPrescription: async (prescriptionId) => {
    try {
      set({ loading: true, error: null });

      const { data: prescription, error: prescriptionError } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('id', prescriptionId)
        .single();

      if (prescriptionError) throw prescriptionError;

      const { data: medications, error: medicationsError } = await supabase
        .from('medications')
        .select('*')
        .eq('prescription_id', prescriptionId)
        .order('sort_order');

      if (medicationsError) throw medicationsError;

      set({ loading: false });
      return { success: true, prescription, medications };
    } catch (error) {
      console.error('Fetch prescription error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Delete prescription
  deletePrescription: async (prescriptionId) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', prescriptionId);

      if (error) throw error;

      // Remove from local state
      set((state) => ({
        prescriptions: state.prescriptions.filter((p) => p.id !== prescriptionId),
        loading: false,
      }));

      return { success: true };
    } catch (error) {
      console.error('Delete prescription error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Upload PDF to storage and update prescription
  uploadPDF: async (prescriptionId, pdfBlob) => {
    try {
      set({ loading: true, error: null });

      const fileName = `prescription-${prescriptionId}-${Date.now()}.pdf`;
      const filePath = `pdfs/${fileName}`;

      // Upload PDF
      const { error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('prescriptions').getPublicUrl(filePath);

      // Update prescription with PDF URL
      const { error: updateError } = await supabase
        .from('prescriptions')
        .update({ pdf_url: publicUrl })
        .eq('id', prescriptionId);

      if (updateError) throw updateError;

      set({ loading: false });
      return { success: true, pdfUrl: publicUrl };
    } catch (error) {
      console.error('Upload PDF error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Reset current prescription
  resetPrescription: () =>
    set({ currentPrescription: { ...initialPrescription } }),

  // Load draft from localStorage
  loadDraft: () => {
    try {
      const draft = localStorage.getItem('prescription_draft');
      if (draft) {
        set({ currentPrescription: JSON.parse(draft) });
      }
    } catch (error) {
      console.error('Load draft error:', error);
    }
  },

  // Save draft to localStorage
  saveDraft: () => {
    try {
      const { currentPrescription } = get();
      localStorage.setItem(
        'prescription_draft',
        JSON.stringify(currentPrescription)
      );
    } catch (error) {
      console.error('Save draft error:', error);
    }
  },

  // Clear draft from localStorage
  clearDraft: () => {
    try {
      localStorage.removeItem('prescription_draft');
    } catch (error) {
      console.error('Clear draft error:', error);
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default usePrescriptionStore;
