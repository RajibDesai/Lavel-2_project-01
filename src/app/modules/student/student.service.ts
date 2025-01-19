import { Student } from './student.model.js';
import { TStudent } from './student.interface.js';

const createStudentIntoDB = async (studentData: TStudent) => {
  try {
    if (await Student.isUserExist(studentData.id)) {
      //  isUserExist ব্যবহৃত হয়েছে
      throw new Error('user already exaist'); // ডুপ্লিকেট ID থাকলে ত্রুটি ছোঁড়া হয়
    }
    const result = await Student.create(studentData); //  build in static method

    /* const student = new Student(studentData); // create an instance
    if (await student.isUserExist(studentData.id)) {
      throw new Error('user already exaist');
    } */
    // const result = await student.save();   build in Mongoose instance মেথড
    // নতুন ডকুমেন্ট ডাটাবেসে সেভ করার জন্য ব্যবহৃত হয়।

    return result;
  } catch (error) {
    console.error('Error creating student in DB:', error);
    throw error; // এটিকে থ্রো করে কন্ট্রোলারে পাঠানো হবে
  }
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateStudentInDB = async (id: string, updateData: Partial<TStudent>) => {
  try {
    // Mongoose এর findOneAndUpdate মেথড ব্যবহার
    const result = await Student.findOneAndUpdate(
      // { id, isDeleted: { $ne: true } }, < বিকল্প পদ্ধতি student.model.ts এ pre('findOneAndUpdate') যুক্ত করতে হবে না > // isDeleted ফিল্টার যোগ করা শর্ত অনুযায়ী শিক্ষার্থী খুঁজুন
      { id }, // এখানে `{ id }` হচ্ছে ফিল্টার
      { $set: updateData }, // validatedData দিয়ে আপডেট করুন / আপডেটের জন্য ডেটা
      { new: true, runValidators: true } // অপশনস / আপডেট হওয়া ডেটা ফেরত দিন এবং ভ্যালিডেট চালু রাখুন
    );

    return result;
  } catch (error) {
    console.error('Error updating student in DB:', error);
    throw error;
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};
