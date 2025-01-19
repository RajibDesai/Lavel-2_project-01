import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  father: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mother: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contractNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGurdian;
  LocalGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// Statics মেথডের টাইপ
export interface StudentModelStatics extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}

// for creating instance

// Custom instance methods টাইপ
/* export type StudentMethods = {
  //StudentMethods টাইপ ব্যবহার করে আমরা মডেলের ইনস্ট্যান্সে নতুন মেথড যোগ করতে পারি।
  isUserExist(id: string): Promise<TStudent | null>; // custom instance method & async function
}; */

// export type StudentModel = Model<TStudent, {}, StudentMethods>;
