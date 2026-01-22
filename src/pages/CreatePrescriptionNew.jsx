import { useEffect } from 'react';
import { ArrowLeft, Save, FileText, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usePrescriptionStore from '../store/prescriptionStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { SPECIALTIES, GENDER_OPTIONS } from '../utils/constants';
import { useToast } from '../components/ui/Toast';

const CreatePrescriptionNew = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    currentPrescription,
    updateDoctorDetails,
    updatePatientDetails,
    addMedication,
    updateMedication,
    removeMedication,
    updatePrescriptionContent,
    addCustomField,
    updateCustomField,
    removeCustomField,
    saveDraft,
    resetPrescription,
  } = usePrescriptionStore();

  // Load existing profile on mount
  useEffect(() => {
    const savedProfile = JSON.parse(
      localStorage.getItem('mock_profile') || '{}'
    );

    if (savedProfile.full_name) {
      updateDoctorDetails({
        fullName: savedProfile.full_name || '',
        qualification: savedProfile.qualification || '',
        specialty: savedProfile.specialty || '',
        licenseNumber: savedProfile.license_number || '',
        clinicHospitalName: savedProfile.clinic_hospital_name || '',
        phone: savedProfile.phone || '',
        address: savedProfile.address || '',
      });
    }
  }, [updateDoctorDetails]);

  const handleDoctorChange = (field, value) => {
    updateDoctorDetails({ [field]: value });
  };

  const handlePatientChange = (field, value) => {
    updatePatientDetails({ [field]: value });
  };

  const handleAddMedication = () => {
    addMedication({
      medicationName: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    });
  };

  const handleUpdateMedication = (index, field, value) => {
    updateMedication(index, { [field]: value });
  };

  const handleRemoveMedication = (index) => {
    if (currentPrescription.medications.length > 1) {
      removeMedication(index);
    }
  };

  const handleSaveDraft = () => {
    saveDraft();
    showToast('Draft saved successfully', 'success');
  };

  const handleGenerate = () => {
    // Validate required fields
    if (!currentPrescription.patientDetails.name) {
      showToast('Patient name is required', 'error');
      return;
    }

    if (currentPrescription.medications.length === 0 ||
        !currentPrescription.medications.some(m => m.medicationName)) {
      showToast('At least one medication is required', 'error');
      return;
    }

    // Save prescription to localStorage (mock mode)
    const prescription = {
      id: Date.now().toString(),
      doctorDetails: currentPrescription.doctorDetails,
      patientDetails: currentPrescription.patientDetails,
      medications: currentPrescription.medications.filter(m => m.medicationName),
      diagnosis: currentPrescription.diagnosis,
      symptoms: currentPrescription.symptoms,
      labTests: currentPrescription.labTests,
      followUpDate: currentPrescription.followUpDate,
      additionalNotes: currentPrescription.additionalNotes,
      customFields: currentPrescription.customFields,
      createdAt: new Date().toISOString(),
      status: 'completed',
    };

    const existing = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    localStorage.setItem(
      'prescriptions',
      JSON.stringify([prescription, ...existing])
    );

    showToast('Prescription generated successfully', 'success');
    resetPrescription();
    navigate('/dashboard');
  };

  const { doctorDetails, patientDetails, medications, diagnosis, symptoms, labTests, followUpDate, additionalNotes, customFields } = currentPrescription;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  New Prescription
                </h1>
                <p className="text-sm text-gray-500">
                  Complete the form below to generate a prescription
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveDraft} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleGenerate} size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Workspace */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="space-y-6">
          {/* Doctor Profile */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Doctor Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={doctorDetails.fullName || ''}
                onChange={(e) => handleDoctorChange('fullName', e.target.value)}
                placeholder="Dr. John Doe"
              />
              <Input
                label="Qualification"
                value={doctorDetails.qualification || ''}
                onChange={(e) => handleDoctorChange('qualification', e.target.value)}
                placeholder="MBBS, MD"
              />
              <Select
                label="Specialty"
                value={doctorDetails.specialty || ''}
                onChange={(e) => handleDoctorChange('specialty', e.target.value)}
                options={SPECIALTIES.map((s) => ({ value: s, label: s }))}
              />
              <Input
                label="License Number"
                value={doctorDetails.licenseNumber || ''}
                onChange={(e) => handleDoctorChange('licenseNumber', e.target.value)}
                placeholder="MED-12345"
              />
              <Input
                label="Clinic/Hospital"
                value={doctorDetails.clinicHospitalName || ''}
                onChange={(e) => handleDoctorChange('clinicHospitalName', e.target.value)}
                placeholder="City Medical Center"
              />
              <Input
                label="Phone"
                value={doctorDetails.phone || ''}
                onChange={(e) => handleDoctorChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Patient Name"
                value={patientDetails.name || ''}
                onChange={(e) => handlePatientChange('name', e.target.value)}
                placeholder="John Smith"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Age"
                  type="number"
                  value={patientDetails.age || ''}
                  onChange={(e) => handlePatientChange('age', e.target.value)}
                  placeholder="35"
                />
                <Select
                  label="Gender"
                  value={patientDetails.gender || ''}
                  onChange={(e) => handlePatientChange('gender', e.target.value)}
                  options={GENDER_OPTIONS}
                />
              </div>
              <Input
                label="Contact"
                value={patientDetails.contact || ''}
                onChange={(e) => handlePatientChange('contact', e.target.value)}
                placeholder="+1 (555) 987-6543"
              />
              <Input
                label="Address"
                value={patientDetails.address || ''}
                onChange={(e) => handlePatientChange('address', e.target.value)}
                placeholder="123 Main St"
              />
            </div>
          </div>

          {/* Clinical Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Diagnosis"
                value={diagnosis || ''}
                onChange={(e) => updatePrescriptionContent({ diagnosis: e.target.value })}
                placeholder="Enter diagnosis..."
                rows={3}
              />
              <Textarea
                label="Symptoms"
                value={symptoms || ''}
                onChange={(e) => updatePrescriptionContent({ symptoms: e.target.value })}
                placeholder="Enter symptoms..."
                rows={3}
              />
              <Textarea
                label="Lab Tests (one per line)"
                value={labTests?.join('\n') || ''}
                onChange={(e) => updatePrescriptionContent({ labTests: e.target.value.split('\n').filter(Boolean) })}
                placeholder="CBC\nUrinalysis\nBlood Sugar"
                rows={3}
              />
              <div>
                <Input
                  label="Follow-up Date"
                  type="date"
                  value={followUpDate || ''}
                  onChange={(e) => updatePrescriptionContent({ followUpDate: e.target.value })}
                />
                <Textarea
                  label="Additional Notes"
                  value={additionalNotes || ''}
                  onChange={(e) => updatePrescriptionContent({ additionalNotes: e.target.value })}
                  placeholder="Any additional instructions..."
                  rows={2}
                  className="mt-4"
                />
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Prescription (Rx)
              </h2>
              <Button onClick={handleAddMedication} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            </div>

            <div className="space-y-3">
              {medications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No medications added yet. Click "Add Medicine" to start.</p>
                </div>
              )}
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-start p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="col-span-3">
                    <Input
                      placeholder="Medicine name"
                      value={med.medicationName || ''}
                      onChange={(e) =>
                        handleUpdateMedication(index, 'medicationName', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Dosage"
                      value={med.dosage || ''}
                      onChange={(e) =>
                        handleUpdateMedication(index, 'dosage', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Frequency"
                      value={med.frequency || ''}
                      onChange={(e) =>
                        handleUpdateMedication(index, 'frequency', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Duration"
                      value={med.duration || ''}
                      onChange={(e) =>
                        handleUpdateMedication(index, 'duration', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Instructions"
                      value={med.instructions || ''}
                      onChange={(e) =>
                        handleUpdateMedication(index, 'instructions', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveMedication(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Remove medication"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Custom Fields
              </h2>
              <Button onClick={addCustomField} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            {customFields && customFields.length > 0 ? (
              <div className="space-y-3">
                {customFields.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-start p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="col-span-5">
                      <Input
                        placeholder="Field name (e.g., Diet, Exercise)"
                        value={field.label || ''}
                        onChange={(e) =>
                          updateCustomField(index, { label: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        placeholder="Value"
                        value={field.value || ''}
                        onChange={(e) =>
                          updateCustomField(index, { value: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        onClick={() => removeCustomField(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Remove field"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No custom fields added. Click "Add Field" to include additional information.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrescriptionNew;
