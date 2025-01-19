import { Model, Schema, model } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
}

// ইনস্ট্যান্স মেথডের জন্য interface
interface IUserMethods {
  fullName(): string;
}

// মডেল টাইপ ডিফাইন করা
type UserModel = Model<IUser, {}, IUserMethods>;

// স্কিমা তৈরি করা
const schema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// ইনস্ট্যান্স মেথড যোগ করা
schema.method('fullName', function fullName() {
  return this.firstName + ' ' + this.lastName;
});

const User = model<IUser, UserModel>('User', schema);

const user = new User({ firstName: 'Jean-Luc', lastName: 'Picard' });
const fullName: string = user.fullName(); // 'Jean-Luc Picard'
console.log(fullName); // আউটপুট: Jean-Luc Picard

// এখানে fullName() একটি ইনস্ট্যান্স মেথড যা প্রতিটি User অবজেক্টে কাজ করবে।
