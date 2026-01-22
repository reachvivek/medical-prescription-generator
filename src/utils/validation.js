import { z } from 'zod';
import { VALIDATION_MESSAGES } from './constants';

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.REQUIRED)
  .email(VALIDATION_MESSAGES.INVALID_EMAIL);

// Phone validation schema (basic)
export const phoneSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.REQUIRED)
  .regex(/^[0-9+\-\s()]+$/, VALIDATION_MESSAGES.INVALID_PHONE);

// Password schema
export const passwordSchema = z
  .string()
  .min(8, VALIDATION_MESSAGES.MIN_PASSWORD_LENGTH);

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
});

// Signup schema
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    fullName: z.string().min(2, VALIDATION_MESSAGES.MIN_LENGTH(2)),
    licenseNumber: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    specialty: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

// Profile schema
export const profileSchema = z.object({
  fullName: z.string().min(2, VALIDATION_MESSAGES.MIN_LENGTH(2)),
  specialty: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  licenseNumber: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  clinicHospitalName: z.string().optional(),
  address: z.string().optional(),
});

// Patient details schema
export const patientDetailsSchema = z.object({
  name: z.string().min(2, VALIDATION_MESSAGES.MIN_LENGTH(2)),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be positive')
    .max(150, 'Please enter a valid age')
    .optional()
    .or(z.literal('')),
  gender: z.string().optional(),
  contact: phoneSchema.optional().or(z.literal('')),
  address: z.string().optional(),
});

// Medication schema
export const medicationSchema = z.object({
  medicationName: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  dosage: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  frequency: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  duration: z.string().optional(),
  instructions: z.string().optional(),
});

// Prescription content schema
export const prescriptionContentSchema = z.object({
  medications: z
    .array(medicationSchema)
    .min(1, 'At least one medication is required'),
  diagnosis: z.string().optional(),
  symptoms: z.string().optional(),
  labTests: z.array(z.string()).optional(),
  followUpDate: z.date().optional().nullable(),
  additionalNotes: z.string().optional(),
  customFields: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

// Helper to format validation errors for display
export const formatValidationErrors = (errors) => {
  if (!errors) return {};

  const formatted = {};
  Object.keys(errors).forEach((key) => {
    formatted[key] = errors[key]?.message || 'Invalid value';
  });
  return formatted;
};
