import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, FileDown } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import DoctorDetailsStep from './steps/DoctorDetailsStep';
import PatientDetailsStep from './steps/PatientDetailsStep';
import PrescriptionContentStep from './steps/PrescriptionContentStep';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useToast } from '../ui/Toast';

const WIZARD_STEPS = [
  {
    title: 'Doctor Details',
    description: 'Your information',
    component: DoctorDetailsStep,
  },
  {
    title: 'Patient Details',
    description: 'Patient information',
    component: PatientDetailsStep,
  },
  {
    title: 'Prescription',
    description: 'Medical details',
    component: PrescriptionContentStep,
  },
];

const PrescriptionWizard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [generating, setGenerating] = useState(false);

  // Load saved draft from localStorage
  const loadDraft = () => {
    try {
      const saved = localStorage.getItem('prescription_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
    return {
      doctorDetails: {},
      patientDetails: {},
      medications: [
        {
          medicationName: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: '',
        },
      ],
      diagnosis: '',
      symptoms: '',
      labTests: [],
      followUpDate: '',
      additionalNotes: '',
      customFields: [],
    };
  };

  const [prescriptionData, setPrescriptionData] = useState(loadDraft);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(
        'prescription_draft',
        JSON.stringify(prescriptionData)
      );
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, [prescriptionData]);

  const updateStepData = (step, data) => {
    setPrescriptionData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      const { fullName, specialty, licenseNumber } =
        prescriptionData.doctorDetails;
      if (!fullName || !specialty || !licenseNumber) {
        toast.error('Please fill in all required doctor details');
        return;
      }
    } else if (currentStep === 2) {
      const { name } = prescriptionData.patientDetails;
      if (!name) {
        toast.error('Please enter patient name');
        return;
      }
    } else if (currentStep === 3) {
      // Validate medications
      const validMedications = prescriptionData.medications.filter(
        (med) => med.medicationName && med.dosage && med.frequency
      );
      if (validMedications.length === 0) {
        toast.error(
          'Please add at least one medication with name, dosage, and frequency'
        );
        return;
      }
    }

    if (currentStep < 3) {
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

  const saveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const generatePrescription = async () => {
    // Final validation
    const validMedications = prescriptionData.medications.filter(
      (med) => med.medicationName && med.dosage && med.frequency
    );

    if (validMedications.length === 0) {
      toast.error('Please add at least one complete medication');
      return;
    }

    setGenerating(true);

    try {
      // Simulate PDF generation (replace with actual PDF generation later)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save to localStorage "database"
      const prescriptions = JSON.parse(
        localStorage.getItem('prescriptions') || '[]'
      );

      const newPrescription = {
        id: Date.now().toString(),
        ...prescriptionData,
        medications: validMedications,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };

      prescriptions.push(newPrescription);
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions));

      // Clear draft
      localStorage.removeItem('prescription_draft');

      toast.success('Prescription generated successfully!');

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error generating prescription:', error);
      toast.error('Failed to generate prescription. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const CurrentStepComponent = WIZARD_STEPS[currentStep - 1].component;
  const stepDataKey =
    currentStep === 1
      ? 'doctorDetails'
      : currentStep === 2
      ? 'patientDetails'
      : 'prescriptionContent';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} steps={WIZARD_STEPS} />

      {/* Step Content */}
      <Card className="mb-8">
        <CurrentStepComponent
          data={
            currentStep === 3
              ? prescriptionData
              : prescriptionData[stepDataKey]
          }
          onUpdate={(data) =>
            currentStep === 3
              ? setPrescriptionData((prev) => ({ ...prev, ...data }))
              : updateStepData(stepDataKey, data)
          }
        />
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              disabled={generating}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={saveDraft}
            variant="ghost"
            size="lg"
            disabled={generating}
          >
            <Save className="h-5 w-5 mr-2" />
            Save Draft
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext} size="lg" disabled={generating}>
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={generatePrescription}
              size="lg"
              loading={generating}
              disabled={generating}
            >
              <FileDown className="h-5 w-5 mr-2" />
              Generate Prescription
            </Button>
          )}
        </div>
      </div>

      {/* Draft Auto-save Indicator */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Your progress is automatically saved
        </p>
      </div>
    </div>
  );
};

export default PrescriptionWizard;
