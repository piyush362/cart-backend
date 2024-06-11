import { Model, Schema, model } from "mongoose";

export interface User {
  userName: string;
  fullName: string;
}

interface UserModelInterface extends Model<User> {}

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = model<User, UserModelInterface>("User", userSchema);
