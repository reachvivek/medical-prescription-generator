// App constants

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Medical Prescription Generator';

// Prescription status
export const PRESCRIPTION_STATUS = {
  DRAFT: 'draft',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Medication frequency options (common presets)
export const FREQUENCY_OPTIONS = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'Every 4 hours',
  'Every 6 hours',
  'Every 8 hours',
  'Every 12 hours',
  'As needed',
  'Before meals',
  'After meals',
  'At bedtime',
];

// Duration options (common presets)
export const DURATION_OPTIONS = [
  '3 days',
  '5 days',
  '7 days',
  '10 days',
  '14 days',
  '21 days',
  '1 month',
  '2 months',
  '3 months',
  '6 months',
  'Until review',
  'Continuous',
];

// Medical specialties
export const SPECIALTIES = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Endocrinologist',
  'Gastroenterologist',
  'Neurologist',
  'Oncologist',
  'Orthopedic Surgeon',
  'Pediatrician',
  'Psychiatrist',
  'Pulmonologist',
  'Radiologist',
  'Surgeon',
  'Urologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Gynecologist',
  'Dentist',
  'Other',
];

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: (min) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max) => `Maximum ${max} characters allowed`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  MIN_PASSWORD_LENGTH: 'Password must be at least 8 characters',
};

// Pagination
export const PRESCRIPTIONS_PER_PAGE = 10;

// File upload limits
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Storage buckets
export const STORAGE_BUCKETS = {
  SIGNATURES: 'signatures',
  LOGOS: 'logos',
  PRESCRIPTIONS: 'prescriptions',
};
