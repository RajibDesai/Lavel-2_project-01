import { Schema, model } from 'mongoose';
import { TStudent, StudentModelStatics } from './student.interface.js';
import bcrypt from 'bcrypt';
import config from '../../config/index.js';

const userNameSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, "first name can't more than 20"],
    required: [true, 'First Name is required'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
});

const guardianSchema = new Schema({
  father: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
    trim: true,
  },
  mother: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
    trim: true,
  },
});

const localGardianSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  contractNo: {
    type: String,
    required: [true, 'Local Guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModelStatics>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Student Psasword is required'],
      maxlength: [20, 'password con not more than 20 charecter'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    dateOfBirth: { type: String, required: false },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    email: { type: String, required: [true, 'Email is required'] },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    LocalGuardian: {
      type: localGardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImg: { type: String, required: false },
    isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware / hooks
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  const user = this; // current document
  // hashing passing and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post hool middleware / hooks
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// [ { $match: { isDeleted: { $ne:true } } },{ '$match': { id: 'S1155964' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.pre('findOneAndUpdate', function (next) {
  const filter = this.getFilter(); // ফিল্টার চেক /student.service.ts ফিল্টার অ্যাক্সেস { id }
  if (!filter.isDeleted) {
    // যদি isDeleted ফিল্টার না থাকে  // ফিল্টারে isDeleted চেক
    this.setQuery({ ...filter, isDeleted: { $ne: true } }); // ফিল্টারে isDeleted যোগ করা
  }
  next();
});

// creating a custom static method
// Static method সংজ্ঞা
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id }); // ডাটাবেসে `id` অনুসারে শিক্ষার্থী খুঁজে বের করা
  return existingUser; // শিক্ষার্থী পাওয়া গেলে রিটার্ন করে, নাহলে null রিটার্ন করে
};

// creating a custom instance method
/* studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}; */

export const Student = model<TStudent, StudentModelStatics>(
  'Student',
  studentSchema
);
