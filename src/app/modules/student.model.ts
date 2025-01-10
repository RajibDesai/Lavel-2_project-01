import { Schema, model, connect } from 'mongoose';
import { Student } from './student/student.interface.js';

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: {
        firstName: {
            type: String,
            require: true
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            require: true
        }
    },
    gender: ["male", "female"],
    dateOfBirth: { String },
    email: { String, required: true },
    contactNo: { String },
    emergencyContactNo: { String },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { String, required: true },
    permanentAddress: { String, required: true },
    gardian: {
        father: {
            type: String,
            require: true
        },
        fatherOccupation: {
            type: String,
            require: true
        },
        fatherContactNo: {
            type: String,
            require: true
        },
        mothar: {
            type: String,
            require: true
        },
        motherOccupation: {
            type: String,
            require: true
        },
        motherContactName: {
            type: String,
            require: true
        }

    },
    localGardian: {
        name: {
            type: String,
            require: true
        },
        occupation: {
            type: String,
            require: true
        },
        contractName: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        }
    },
    profileImg: { String, required: true },
    isActive: { String, required: true }
})