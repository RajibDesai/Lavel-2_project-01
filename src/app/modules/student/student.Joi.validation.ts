import Joi from 'Joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Z][a-z]*$/) // Must start with an uppercase letter and contain only alphabets
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'First Name must start with an uppercase letter and contain only alphabets.',
      'string.max': "First Name can't be more than 20 characters.",
      'any.required': 'First Name is required.',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z\s]+$/) // Must contain only alphabets and spaces
    .required()
    .messages({
      'string.pattern.base':
        'Last Name should only contain letters and spaces.',
      'any.required': 'Last Name is required.',
    }),
});

const guardianValidationSchema = Joi.object({
  father: Joi.string().required().messages({
    'any.required': 'Father name is required.',
  }),
  fatherOccupation: Joi.string().required().trim().messages({
    'any.required': 'Father occupation is required.',
  }),
  fatherContactNo: Joi.string().required().trim().messages({
    'any.required': 'Father contact number is required.',
  }),
  mother: Joi.string().required().messages({
    'any.required': 'Mother name is required.',
  }),
  motherOccupation: Joi.string().required().trim().messages({
    'any.required': 'Mother occupation is required.',
  }),
  motherContactNo: Joi.string().required().trim().messages({
    'any.required': 'Mother contact number is required.',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'Local Guardian name is required.',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local Guardian occupation is required.',
  }),
  contractNo: Joi.string().required().messages({
    'any.required': 'Local Guardian contact number is required.',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local Guardian address is required.',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required.',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required.',
  }),
  dateOfBirth: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be either male or female.',
    'any.required': 'Gender is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid.',
    'any.required': 'Email is required.',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'any.only': '{#value} is not a supported blood group.',
      'any.required': 'Blood group is required.',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  LocalGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required.',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked.',
  }),
});

export const validData = studentValidationSchema;
