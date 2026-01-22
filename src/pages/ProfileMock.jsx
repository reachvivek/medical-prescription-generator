import { useState } from 'react';
import { User, Building2, Phone } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import { SPECIALTIES } from '../utils/constants';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

const ProfileMock = () => {
  const toast = useToast();

  // Load mock profile from localStorage
  const loadedProfile = JSON.parse(
    localStorage.getItem('mock_profile') || '{}'
  );

  const [profile, setProfile] = useState({
    fullName: loadedProfile.full_name || '',
    specialty: loadedProfile.specialty || '',
    licenseNumber: loadedProfile.license_number || '',
    email: loadedProfile.email || '',
    phone: loadedProfile.phone || '',
    clinicHospitalName: loadedProfile.clinic_hospital_name || '',
    address: loadedProfile.address || '',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate save delay
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem(
        'mock_profile',
        JSON.stringify({
          full_name: profile.fullName,
          specialty: profile.specialty,
          license_number: profile.licenseNumber,
          email: profile.email,
          phone: profile.phone,
          clinic_hospital_name: profile.clinicHospitalName,
          address: profile.address,
        })
      );

      setSaving(false);
      toast.success('Profile updated successfully!');
    }, 500);
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
          Manage your professional information (Demo Mode - Local Storage)
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="Dr. John Doe"
                value={profile.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="doctor@example.com"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
              <Select
                label="Specialty"
                options={specialtyOptions}
                placeholder="Select your specialty"
                value={profile.specialty}
                onChange={(e) => handleChange('specialty', e.target.value)}
                required
              />
              <Input
                label="License Number"
                placeholder="Enter your medical license number"
                value={profile.licenseNumber}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
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
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
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
                label="Clinic/Hospital Name"
                placeholder="City Medical Center"
                value={profile.clinicHospitalName}
                onChange={(e) =>
                  handleChange('clinicHospitalName', e.target.value)
                }
              />
              <Textarea
                label="Address"
                placeholder="123 Medical Plaza, Suite 100, City, State, ZIP"
                rows={3}
                value={profile.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" loading={saving} disabled={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileMock;
