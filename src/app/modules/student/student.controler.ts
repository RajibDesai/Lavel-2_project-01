import { Request, Response } from 'express';
import { StudentServices } from './student.service.js';

const createStudent = async (req: Request, res: Response) => {
  try {
    console.log('Request Body:', req.body);
    const { student } = req.body;
    const result = await StudentServices.createStudentIntoDB(student);
    console.log('result::', result);

    res.status(200).json({
      success: true,
      message: 'create student successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: err.message,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: err.message,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'fail to send student',
      error: err.message,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
