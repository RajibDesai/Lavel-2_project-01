import { Schema, model, connect } from 'mongoose';
import {
  Gurdian,
  LocalGurdian,
  Student,
  UserName,
} from './student/student.interface.js';

const userNameScshma = new Schema<UserName>({
  firstName: {
    type: String,
    require: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    require: true,
  },
});

const gardianSchema = new Schema<Gurdian>({
  father: {
    type: String,
    require: true,
  },
  fatherOccupation: {
    type: String,
    require: true,
  },
  fatherContactNo: {
    type: String,
    require: true,
  },
  mothar: {
    type: String,
    require: true,
  },
  motherOccupation: {
    type: String,
    require: true,
  },
  motherContactName: {
    type: String,
    require: true,
  },
});

const localGardianSchema = new Schema<LocalGurdian>({
  name: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  contractName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameScshma,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { String, required: true },
  contactNo: { String },
  emergencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: gardianSchema,
  localGardian: localGardianSchema,
  profileImg: { String },
  isActive: ['active', 'blocked'],
});

const Student = model<Student>('Student', studentSchema);
