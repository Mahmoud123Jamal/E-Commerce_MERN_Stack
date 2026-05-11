import { RequestHandler } from "express";
import { AsyncHandler } from "../types/AsyncHandler.type";

export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
