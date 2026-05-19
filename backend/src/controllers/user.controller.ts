import { Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";

import {
  registerUserService,
  loginUserService,
  getUserInfoService,
} from "../services/user.service";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Name, email and password are required",
    });
  }

  const data = await registerUserService(name, email, password, role);

  res.status(201).json({
    status: "success",
    data,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email and password are required",
    });
  }

  const data = await loginUserService(email, password);

  res.status(200).json({
    status: "success",
    data,
  });
});

export const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  const user = await getUserInfoService(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
