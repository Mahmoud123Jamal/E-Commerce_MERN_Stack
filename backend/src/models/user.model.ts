import { IUser } from "./../types/User.model.type";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
