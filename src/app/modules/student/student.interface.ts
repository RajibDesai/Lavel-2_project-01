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
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contractNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Gurdian;
  LocalGuardian: LocalGuardian;
  profileImg?: string;
};
