import PrescriptionWizard from '../components/prescription/PrescriptionWizard';

const CreatePrescription = () => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Create New Prescription
        </h1>
        <p className="text-gray-600 mt-2">
          Follow the 3-step wizard to generate a professional prescription
        </p>
      </div>

      <PrescriptionWizard />
    </div>
  );
};

export default CreatePrescription;
