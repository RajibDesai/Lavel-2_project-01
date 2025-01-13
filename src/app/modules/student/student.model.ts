import { Schema, model } from 'mongoose';
import { Student } from './student.interface.js';

const userNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema({
  father: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  mother: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGardianSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contractNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: { type: userNameSchema, required: true },
  dateOfBirth: { type: String, required: false },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  LocalGuardian: { type: localGardianSchema, required: true },
  profileImg: { type: String, required: false },
});

export const StudentModel = model<Student>('Student', studentSchema);
