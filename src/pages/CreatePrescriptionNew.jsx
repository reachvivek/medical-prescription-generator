import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, FileText, Plus, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usePrescriptionStore from '../store/prescriptionStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { SPECIALTIES, GENDER_OPTIONS } from '../utils/constants';
import { useToast } from '../components/ui/Toast';
import { cn } from '../utils/helpers';

const STEPS = [
  { title: 'Doctor Profile', description: 'Your information' },
  { title: 'Patient Details', description: 'Patient information' },
  { title: 'Clinical Info', description: 'Diagnosis & symptoms' },
  { title: 'Medications', description: 'Prescription details' },
  { title: 'Review', description: 'Final review' },
];

const CreatePrescriptionNew = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

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

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!currentPrescription.doctorDetails.fullName) {
        showToast('Doctor name is required', 'error');
        return;
      }
    } else if (currentStep === 2) {
      if (!currentPrescription.patientDetails.name) {
        showToast('Patient name is required', 'error');
        return;
      }
    } else if (currentStep === 4) {
      if (currentPrescription.medications.length === 0 ||
          !currentPrescription.medications.some(m => m.medicationName)) {
        showToast('At least one medication is required', 'error');
        return;
      }
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerate = () => {
    // Final validation
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
                  Complete all steps to generate prescription
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveDraft} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={stepNumber} className="flex items-start flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                        isCompleted &&
                          'bg-sky-600 text-white ring-4 ring-sky-100',
                        isCurrent &&
                          'bg-sky-600 text-white ring-4 ring-sky-200 scale-110',
                        !isCompleted &&
                          !isCurrent &&
                          'bg-gray-200 text-gray-600'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{stepNumber}</span>
                      )}
                    </div>
                    <div className="mt-2 text-center w-full px-2">
                      <p
                        className={cn(
                          'text-xs font-medium whitespace-nowrap',
                          isCurrent && 'text-sky-700',
                          isCompleted && 'text-sky-600',
                          !isCurrent && !isCompleted && 'text-gray-500'
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 hidden lg:block whitespace-nowrap">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-0.5 mt-5 mx-2 transition-all duration-300',
                        isCompleted ? 'bg-sky-600' : 'bg-gray-200'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Step 1: Doctor Profile */}
        {currentStep === 1 && (
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
                required
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
        )}

        {/* Step 2: Patient Details */}
        {currentStep === 2 && (
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
        )}

        {/* Step 3: Clinical Information */}
        {currentStep === 3 && (
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
                placeholder="CBC&#10;Urinalysis&#10;Blood Sugar"
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
        )}

        {/* Step 4: Medications */}
        {currentStep === 4 && (
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

            {/* Custom Fields */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-gray-900">
                  Custom Fields (Optional)
                </h3>
                <Button onClick={addCustomField} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {customFields && customFields.length > 0 && (
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
              )}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-4">
            {/* Doctor Details Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Doctor Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{doctorDetails.fullName || '-'}</span></div>
                <div><span className="text-gray-500">Qualification:</span> <span className="font-medium">{doctorDetails.qualification || '-'}</span></div>
                <div><span className="text-gray-500">Specialty:</span> <span className="font-medium">{doctorDetails.specialty || '-'}</span></div>
                <div><span className="text-gray-500">License:</span> <span className="font-medium">{doctorDetails.licenseNumber || '-'}</span></div>
              </div>
            </div>

            {/* Patient Details Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Patient Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{patientDetails.name || '-'}</span></div>
                <div><span className="text-gray-500">Age:</span> <span className="font-medium">{patientDetails.age || '-'}</span></div>
                <div><span className="text-gray-500">Gender:</span> <span className="font-medium">{patientDetails.gender || '-'}</span></div>
                <div><span className="text-gray-500">Contact:</span> <span className="font-medium">{patientDetails.contact || '-'}</span></div>
              </div>
            </div>

            {/* Clinical Info Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Clinical Information</h3>
              <div className="space-y-2 text-sm">
                {diagnosis && <div><span className="text-gray-500">Diagnosis:</span> <span className="font-medium">{diagnosis}</span></div>}
                {symptoms && <div><span className="text-gray-500">Symptoms:</span> <span className="font-medium">{symptoms}</span></div>}
                {labTests && labTests.length > 0 && <div><span className="text-gray-500">Lab Tests:</span> <span className="font-medium">{labTests.join(', ')}</span></div>}
              </div>
            </div>

            {/* Medications Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Medications ({medications.filter(m => m.medicationName).length})</h3>
              <div className="space-y-2">
                {medications.filter(m => m.medicationName).map((med, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="font-medium text-gray-900">{med.medicationName}</div>
                    <div className="text-gray-600 text-xs mt-1">
                      {med.dosage && `Dosage: ${med.dosage}`}
                      {med.frequency && ` • Frequency: ${med.frequency}`}
                      {med.duration && ` • Duration: ${med.duration}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <div>
            {currentStep > 1 && (
              <Button onClick={handleBack} variant="outline" size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            )}
          </div>

          <div>
            {currentStep < STEPS.length ? (
              <Button onClick={handleNext} size="lg">
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleGenerate} size="lg">
                <FileText className="h-4 w-4 mr-2" />
                Generate Prescription
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrescriptionNew;
