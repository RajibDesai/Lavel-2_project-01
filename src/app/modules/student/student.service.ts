import { StudentModel } from './student.model.js';
import { Student } from './student.interface.js';

const createStudentIntoDB = async (student: Student) => {
  try {
    console.log('Create Student', student);
    const result = await StudentModel.create(student);
    return result;
  } catch (error) {
    console.error('Error creating student in DB:', error);
    throw error; // এটিকে থ্রো করে কন্ট্রোলারে পাঠানো হবে
  }
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
