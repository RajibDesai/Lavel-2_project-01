import { Schema, model, connect } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Gurdian = {
  father: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mothar: string;
  motherOccupation: string;
  motherContactName: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contractName: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGardian: LocalGurdian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
