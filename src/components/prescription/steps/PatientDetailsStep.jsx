import { useForm } from 'react-hook-form';
import { UserCircle, Calendar, Phone, MapPin } from 'lucide-react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { GENDER_OPTIONS } from '../../../utils/constants';

const PatientDetailsStep = ({ data, onUpdate }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const handleFieldChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <UserCircle className="h-7 w-7 mr-3 text-primary-600" />
          Patient Information
        </h2>
        <p className="text-gray-600 mt-1">
          Enter the patient's details for this prescription
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserCircle className="h-5 w-5 mr-2 text-primary-600" />
          Basic Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              {...register('name', { required: 'Patient name is required' })}
              label="Patient Name"
              placeholder="John Smith"
              error={errors.name?.message}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              required
            />
          </div>
          <Input
            {...register('age')}
            label="Age"
            type="number"
            placeholder="35"
            min="0"
            max="150"
            onChange={(e) =>
              handleFieldChange('age', e.target.value ? parseInt(e.target.value) : '')
            }
          />
          <Select
            {...register('gender')}
            label="Gender"
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            onChange={(e) => handleFieldChange('gender', e.target.value)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-primary-600" />
          Contact Details
        </h3>
        <div className="space-y-4">
          <Input
            {...register('contact')}
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 987-6543"
            onChange={(e) => handleFieldChange('contact', e.target.value)}
          />
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
          Address
        </h3>
        <Textarea
          {...register('address')}
          label="Patient Address"
          placeholder="456 Patient Street, Apt 5B, City, State, ZIP"
          rows={3}
          onChange={(e) => handleFieldChange('address', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PatientDetailsStep;
