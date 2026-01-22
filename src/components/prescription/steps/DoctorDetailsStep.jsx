import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Building2, Phone, Award } from 'lucide-react';
import useProfileMock from '../../../hooks/useProfileMock';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { SPECIALTIES } from '../../../utils/constants';

const DoctorDetailsStep = ({ data, onUpdate }) => {
  const { profile } = useProfileMock();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  // Auto-fill from profile when available
  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.full_name || '');
      setValue('specialty', profile.specialty || '');
      setValue('licenseNumber', profile.license_number || '');
      setValue('clinicHospitalName', profile.clinic_hospital_name || '');
      setValue('address', profile.address || '');
      setValue('phone', profile.phone || '');
      setValue('email', profile.email || '');

      // Also update parent state
      onUpdate({
        fullName: profile.full_name || '',
        specialty: profile.specialty || '',
        licenseNumber: profile.license_number || '',
        clinicHospitalName: profile.clinic_hospital_name || '',
        address: profile.address || '',
        phone: profile.phone || '',
        email: profile.email || '',
      });
    }
  }, [profile, setValue, onUpdate]);

  const specialtyOptions = SPECIALTIES.map((specialty) => ({
    value: specialty,
    label: specialty,
  }));

  // Update parent state on field change
  const handleFieldChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <User className="h-7 w-7 mr-3 text-primary-600" />
          Doctor Information
        </h2>
        <p className="text-gray-600 mt-1">
          Your details will appear on the prescription
          {profile && ' (auto-filled from your profile)'}
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-primary-600" />
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('fullName', { required: 'Name is required' })}
            label="Full Name"
            placeholder="Dr. John Doe"
            error={errors.fullName?.message}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            required
          />
          <Select
            {...register('specialty', { required: 'Specialty is required' })}
            label="Specialty"
            options={specialtyOptions}
            placeholder="Select specialty"
            error={errors.specialty?.message}
            onChange={(e) => handleFieldChange('specialty', e.target.value)}
            required
          />
          <Input
            {...register('licenseNumber', {
              required: 'License number is required',
            })}
            label="License Number"
            placeholder="MED-12345"
            error={errors.licenseNumber?.message}
            onChange={(e) => handleFieldChange('licenseNumber', e.target.value)}
            required
          />
          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="doctor@example.com"
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-primary-600" />
          Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('phone')}
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            onChange={(e) => handleFieldChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Clinic Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-primary-600" />
          Clinic/Hospital Information
        </h3>
        <div className="space-y-4">
          <Input
            {...register('clinicHospitalName')}
            label="Clinic/Hospital Name"
            placeholder="City Medical Center"
            onChange={(e) =>
              handleFieldChange('clinicHospitalName', e.target.value)
            }
          />
          <Textarea
            {...register('address')}
            label="Address"
            placeholder="123 Medical Plaza, Suite 100, City, State, ZIP"
            rows={3}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsStep;
