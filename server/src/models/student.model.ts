import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  profileImage: string;
}

const studentSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    profileImage: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentModel: Model<IUser> = mongoose.model<IUser>('student', studentSchema, 'student');

export { StudentModel };
