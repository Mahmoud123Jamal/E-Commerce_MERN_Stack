import { Document, Types } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export type UserType = {
  _id: Types.ObjectId;
  name: string;
};
