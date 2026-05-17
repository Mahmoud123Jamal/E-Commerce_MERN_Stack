import { catchAsync } from "./../utils/catchAsync";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../utils/JWT";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role = "user" } = req.body;

  // 1. Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      data: { message: "Name, email and password are required" },
    });
  }

  // 2. Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      status: "fail",
      data: { message: "User already exists" },
    });
  }

  // 3. Hash password
  const hashedPassword = await hashPassword(password);

  // 4. Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 5. Generate token
  const token = generateToken(
    newUser.email,
    newUser._id as string,
    newUser.role,
  );

  // 6. Remove password safely
  const userObj = newUser.toObject();
  const { password: _, ...userWithoutPassword } = userObj;

  // 7. Response
  return res.status(201).json({
    status: "success",
    data: {
      user: userWithoutPassword,
      token,
    },
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password: inputPassword } = req.body;

  // 1. Validate input
  if (!email || !inputPassword) {
    return res.status(400).json({
      status: "fail",
      data: { message: "Email and password are required" },
    });
  }

  // 2. Find user + include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      status: "fail",
      data: { message: "Invalid credentials" },
    });
  }

  // 3. Check password
  const isPasswordValid = await comparePassword(inputPassword, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "fail",
      data: { message: "Invalid credentials" },
    });
  }

  // 4. Generate token
  const token = generateToken(user.email, user._id as string, user.role);

  // 5. Remove password safely
  const userObj = user.toObject();
  const { password: _, ...userWithoutPassword } = userObj;

  // 6. Response
  return res.status(200).json({
    status: "success",
    data: {
      user: userWithoutPassword,
      token,
    },
  });
});

export const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({
      status: "fail",
      data: { message: "User not found" },
    });
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
});
