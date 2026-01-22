import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useProfileStore from '../store/profileStore';
import { useToast } from '../components/ui/Toast';
import { signupSchema } from '../utils/validation';
import { SPECIALTIES } from '../utils/constants';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const { createProfile } = useProfileStore();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    // Sign up user
    const result = await signup(data.email, data.password);

    if (result.success) {
      // Create profile
      const profileResult = await createProfile(result.user.id, {
        full_name: data.fullName,
        email: data.email,
        license_number: data.licenseNumber,
        specialty: data.specialty,
      });

      if (profileResult.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Account created but profile setup failed. Please update your profile.');
        navigate('/profile');
      }
    } else {
      toast.error(result.error || 'Signup failed. Please try again.');
    }
  };

  const specialtyOptions = SPECIALTIES.map((specialty) => ({
    value: specialty,
    label: specialty,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the Medical Prescription Generator
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              autoComplete="email"
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

            <div className="relative">
              <Input
                {...register('password')}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                error={errors.password?.message}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                {...register('confirmPassword')}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
