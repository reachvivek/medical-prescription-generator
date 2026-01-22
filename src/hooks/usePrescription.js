import { useEffect } from 'react';
import usePrescriptionStore from '../store/prescriptionStore';

/**
 * Custom hook for prescription management
 * Provides all prescription-related methods
 */
const usePrescription = () => {
  const {
    currentPrescription,
    prescriptions,
    loading,
    error,
    setStep,
    updateDoctorDetails,
    updatePatientDetails,
    addMedication,
    updateMedication,
    removeMedication,
    updatePrescriptionContent,
    addCustomField,
    updateCustomField,
    removeCustomField,
    savePrescription,
    fetchPrescriptions,
    fetchPrescription,
    deletePrescription,
    uploadPDF,
    resetPrescription,
    loadDraft,
    saveDraft,
    clearDraft,
    clearError,
  } = usePrescriptionStore();

  // Load draft on mount
  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  // Auto-save draft when currentPrescription changes
  useEffect(() => {
    if (currentPrescription.step > 1) {
      saveDraft();
    }
  }, [currentPrescription, saveDraft]);

  return {
    currentPrescription,
    prescriptions,
    loading,
    error,
    setStep,
    updateDoctorDetails,
    updatePatientDetails,
    addMedication,
    updateMedication,
    removeMedication,
    updatePrescriptionContent,
    addCustomField,
    updateCustomField,
    removeCustomField,
    savePrescription,
    fetchPrescriptions,
    fetchPrescription,
    deletePrescription,
    uploadPDF,
    resetPrescription,
    clearDraft,
    clearError,
  };
};

export default usePrescription;
