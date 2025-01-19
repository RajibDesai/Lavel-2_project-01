import { Request, Response } from 'express';
import { StudentServices } from './student.service.js';
import { studentValidationSchema } from './student.Zod.validation.js';
import { updateStudentValidationSchema } from './student.Zod.validation.js';

type StudentControllerType = {
  createStudent: (req: Request, res: Response) => Promise<void>;
  getAllStudents: (req: Request, res: Response) => Promise<void>;
  getSingleStudent: (req: Request, res: Response) => Promise<void>;
  deleteStudent: (req: Request, res: Response) => Promise<void>;
  updateStudent: (req: Request, res: Response) => Promise<void>;
};

const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    // validation with Joi
    /* const { error, value } = validData.validate(studentData);
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details,
      });
      return;
    } */

    // Validation with Zod
    const { student: studentData } = req.body;

    const zodParseData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create student',
      error: err.message,
    });
  }
};

const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: err.message,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: err.message,
    });
  }
};

const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: err.message,
    });
  }
};

const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params; // রিকোয়েস্ট থেকে studentId নেওয়া
    const { student: updateData } = req.body; // req.body থেকে student ডেটা বের করা

    // Zod দিয়ে ভ্যালিডেট করা
    const validatedData = updateStudentValidationSchema.parse(updateData);

    // সার্ভিস লেয়ারে validatedData পাঠানো
    const result = await StudentServices.updateStudentInDB(
      studentId,
      validatedData
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message,
    });
  }
};

export const StudentController: StudentControllerType = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
