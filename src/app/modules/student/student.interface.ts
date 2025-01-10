import { Schema, model, connect } from 'mongoose';

export type Gurdian = {
    father: string;
    fatherOccupation: string;
    fatherContactNo: string;
    mothar: string;
    motherOccupation: string;
    motherContactName: string;
};

export type localGurdian = {
    name: string;
    occupation: string;
    contractName: string;
    address: string;
};

export type userName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type Student = {
    id: string;
    name: userName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    gardian: Gurdian;
    localGardian: localGurdian;
    profileImg?: string;
    isActive: 'active' | 'inActive';
};
