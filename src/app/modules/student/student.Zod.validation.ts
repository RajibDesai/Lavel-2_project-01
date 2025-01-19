import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters")
    .min(1, 'First Name is required'), // Use .min(1) for required strings
  middleName: z.string().trim().default(''),
  lastName: z.string().trim().min(1, 'Last Name is required'), // Use .min(1) for required strings
});

// Guardian Schema
const guardianValidationSchema = z.object({
  father: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required').trim(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .trim(),
  mother: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required').trim(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .trim(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian name is required').trim(),
  occupation: z.string().min(1, 'Local Guardian occupation is required').trim(),
  contractNo: z
    .string()
    .min(1, 'Local Guardian contact number is required')
    .trim(),
  address: z.string().min(1, 'Local Guardian address is required').trim(),
});

// Main Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  password: z.string().max(20).min(1, 'password is required'),
  name: userNameValidationSchema, // No need for `.nonempty()` here
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required',
  }),
  email: z.string().email('Invalid email format'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    required_error: 'Blood group is required',
    invalid_type_error: 'Invalid blood group value',
  }),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianValidationSchema,
  LocalGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

// Partial স্কিমা তৈরি (সব ফিল্ড ঐচ্ছিক)
const updateStudentValidationSchema = studentValidationSchema.partial();

export { studentValidationSchema, updateStudentValidationSchema };
