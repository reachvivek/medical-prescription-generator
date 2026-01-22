import { Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomFieldEntry = ({ field, index, onChange, onRemove }) => {
  const handleChange = (key, value) => {
    onChange(index, { ...field, [key]: value });
  };

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <Input
          label="Field Label"
          placeholder="e.g., Diet, Exercise"
          value={field.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Value"
          placeholder="e.g., Low salt diet"
          value={field.value || ''}
          onChange={(e) => handleChange('value', e.target.value)}
        />
      </div>
      <div className="flex-shrink-0">
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => onRemove(index)}
          className="mb-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomFieldEntry;
