import { Trash2, GripVertical } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '../../utils/constants';

const MedicationEntry = ({ medication, index, onChange, onRemove, canRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, { ...medication, [field]: value });
  };

  const frequencyOptions = FREQUENCY_OPTIONS.map((freq) => ({
    value: freq,
    label: freq,
  }));

  const durationOptions = DURATION_OPTIONS.map((dur) => ({
    value: dur,
    label: dur,
  }));

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div className="flex-shrink-0 pt-8">
          <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          {/* Medication Name */}
          <Input
            label={`Medication ${index + 1}`}
            placeholder="e.g., Amoxicillin"
            value={medication.medicationName || ''}
            onChange={(e) => handleChange('medicationName', e.target.value)}
            required
          />

          {/* Dosage and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Dosage"
              placeholder="e.g., 500mg"
              value={medication.dosage || ''}
              onChange={(e) => handleChange('dosage', e.target.value)}
              required
            />
            <Select
              label="Frequency"
              options={frequencyOptions}
              placeholder="Select frequency"
              value={medication.frequency || ''}
              onChange={(e) => handleChange('frequency', e.target.value)}
              required
            />
          </div>

          {/* Duration */}
          <Select
            label="Duration"
            options={durationOptions}
            placeholder="Select duration"
            value={medication.duration || ''}
            onChange={(e) => handleChange('duration', e.target.value)}
          />

          {/* Instructions */}
          <Textarea
            label="Special Instructions"
            placeholder="e.g., Take with food, avoid alcohol"
            rows={2}
            value={medication.instructions || ''}
            onChange={(e) => handleChange('instructions', e.target.value)}
          />
        </div>

        {/* Remove Button */}
        <div className="flex-shrink-0 pt-8">
          {canRemove && (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onRemove(index)}
              className="p-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationEntry;
