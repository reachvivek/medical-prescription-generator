import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Building2, Phone, MapPin } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';
import { useToast } from '../components/ui/Toast';
import { profileSchema } from '../utils/validation';
import { SPECIALTIES } from '../utils/constants';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: profile?.full_name || '',
      specialty: profile?.specialty || '',
      licenseNumber: profile?.license_number || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || '',
      clinicHospitalName: profile?.clinic_hospital_name || '',
      address: profile?.address || '',
    },
  });

  const onSubmit = async (data) => {
    const result = await updateProfile(user.id, {
      full_name: data.fullName,
      specialty: data.specialty,
      license_number: data.licenseNumber,
      email: data.email,
      phone: data.phone,
      clinic_hospital_name: data.clinicHospitalName,
      address: data.address,
    });

    if (result.success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  const specialtyOptions = SPECIALTIES.map((specialty) => ({
    value: specialty,
    label: specialty,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your professional information
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register('fullName')}
                label="Full Name"
                placeholder="Dr. John Doe"
                error={errors.fullName?.message}
                required
              />
              <Input
                {...register('email')}
                label="Email Address"
                type="email"
                placeholder="doctor@example.com"
                error={errors.email?.message}
                required
              />
              <Select
                {...register('specialty')}
                label="Specialty"
                options={specialtyOptions}
                placeholder="Select your specialty"
                error={errors.specialty?.message}
                required
              />
              <Input
                {...register('licenseNumber')}
                label="License Number"
                placeholder="Enter your medical license number"
                error={errors.licenseNumber?.message}
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-primary-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register('phone')}
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Clinic/Hospital Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-primary-600" />
              Clinic/Hospital Information
            </h3>
            <div className="space-y-6">
              <Input
                {...register('clinicHospitalName')}
                label="Clinic/Hospital Name"
                placeholder="City Medical Center"
                error={errors.clinicHospitalName?.message}
              />
              <Textarea
                {...register('address')}
                label="Address"
                placeholder="123 Medical Plaza, Suite 100, City, State, ZIP"
                error={errors.address?.message}
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" loading={loading} disabled={loading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
