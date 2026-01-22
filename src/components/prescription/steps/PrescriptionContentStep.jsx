import { useState } from 'react';
import {
  Pill,
  FileText,
  Stethoscope,
  TestTube,
  Calendar,
  Plus,
  StickyNote,
} from 'lucide-react';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';
import MedicationEntry from '../MedicationEntry';
import CustomFieldEntry from '../CustomFieldEntry';

const PrescriptionContentStep = ({ data, onUpdate }) => {
  const [medications, setMedications] = useState(
    data.medications || [
      {
        medicationName: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      },
    ]
  );
  const [labTests, setLabTests] = useState(data.labTests || []);
  const [customFields, setCustomFields] = useState(data.customFields || []);
  const [newLabTest, setNewLabTest] = useState('');

  const handleMedicationChange = (index, medication) => {
    const updated = [...medications];
    updated[index] = medication;
    setMedications(updated);
    onUpdate({ medications: updated });
  };

  const addMedication = () => {
    const updated = [
      ...medications,
      {
        medicationName: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      },
    ];
    setMedications(updated);
    onUpdate({ medications: updated });
  };

  const removeMedication = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
    onUpdate({ medications: updated });
  };

  const handleFieldChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const addLabTest = () => {
    if (newLabTest.trim()) {
      const updated = [...labTests, newLabTest.trim()];
      setLabTests(updated);
      setNewLabTest('');
      onUpdate({ labTests: updated });
    }
  };

  const removeLabTest = (index) => {
    const updated = labTests.filter((_, i) => i !== index);
    setLabTests(updated);
    onUpdate({ labTests: updated });
  };

  const handleCustomFieldChange = (index, field) => {
    const updated = [...customFields];
    updated[index] = field;
    setCustomFields(updated);
    onUpdate({ customFields: updated });
  };

  const addCustomField = () => {
    const updated = [...customFields, { label: '', value: '' }];
    setCustomFields(updated);
    onUpdate({ customFields: updated });
  };

  const removeCustomField = (index) => {
    const updated = customFields.filter((_, i) => i !== index);
    setCustomFields(updated);
    onUpdate({ customFields: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="h-7 w-7 mr-3 text-primary-600" />
          Prescription Content
        </h2>
        <p className="text-gray-600 mt-1">
          Add medications, diagnosis, and treatment plan
        </p>
      </div>

      {/* Medications */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Pill className="h-5 w-5 mr-2 text-primary-600" />
            Medications (Rx)
          </h3>
          <Button
            type="button"
            onClick={addMedication}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Medication
          </Button>
        </div>
        <div className="space-y-4">
          {medications.map((medication, index) => (
            <MedicationEntry
              key={index}
              medication={medication}
              index={index}
              onChange={handleMedicationChange}
              onRemove={removeMedication}
              canRemove={medications.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Diagnosis and Symptoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-primary-600" />
            Diagnosis
          </h3>
          <Textarea
            placeholder="Enter the medical diagnosis..."
            rows={4}
            value={data.diagnosis || ''}
            onChange={(e) => handleFieldChange('diagnosis', e.target.value)}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary-600" />
            Symptoms
          </h3>
          <Textarea
            placeholder="List the patient's symptoms..."
            rows={4}
            value={data.symptoms || ''}
            onChange={(e) => handleFieldChange('symptoms', e.target.value)}
          />
        </div>
      </div>

      {/* Lab Tests */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TestTube className="h-5 w-5 mr-2 text-primary-600" />
          Laboratory Tests Recommended
        </h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Complete Blood Count (CBC)"
              value={newLabTest}
              onChange={(e) => setNewLabTest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addLabTest();
                }
              }}
            />
            <Button type="button" onClick={addLabTest} size="md">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {labTests.length > 0 && (
            <div className="space-y-2">
              {labTests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                >
                  <span className="text-sm text-gray-900">• {test}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLabTest(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Follow-up Date */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary-600" />
          Follow-up Appointment
        </h3>
        <Input
          type="date"
          label="Follow-up Date"
          value={data.followUpDate || ''}
          onChange={(e) => handleFieldChange('followUpDate', e.target.value)}
        />
      </div>

      {/* Additional Notes */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <StickyNote className="h-5 w-5 mr-2 text-primary-600" />
          Additional Notes
        </h3>
        <Textarea
          placeholder="Any additional instructions or notes for the patient..."
          rows={3}
          value={data.additionalNotes || ''}
          onChange={(e) =>
            handleFieldChange('additionalNotes', e.target.value)
          }
        />
      </div>

      {/* Custom Fields */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary-600" />
            Custom Fields
          </h3>
          <Button
            type="button"
            onClick={addCustomField}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Field
          </Button>
        </div>
        {customFields.length > 0 && (
          <div className="space-y-3">
            {customFields.map((field, index) => (
              <CustomFieldEntry
                key={index}
                field={field}
                index={index}
                onChange={handleCustomFieldChange}
                onRemove={removeCustomField}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionContentStep;
