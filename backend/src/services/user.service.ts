import User from "../models/user.model";

import { hashPassword, comparePassword } from "../utils/hashPassword";

import { generateToken } from "../utils/JWT";

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  role: string = "user",
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(
    newUser.email,
    newUser._id as string,
    newUser.role,
  );

  // Remove password
  const userObj = newUser.toObject();

  const { password: _, ...userWithoutPassword } = userObj;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const loginUserService = async (
  email: string,
  inputPassword: string,
) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await comparePassword(inputPassword, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.email, user._id as string, user.role);

  const userObj = user.toObject();

  const { password: _, ...userWithoutPassword } = userObj;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const getUserInfoService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
