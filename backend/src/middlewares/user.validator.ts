import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      data: {
        errors: errors.array().map((err) => ({
          field: err.type === "field" ? err.path : "unknown",
          message: err.msg,
        })),
      },
    });
  }
  next();
};

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),

  validate,
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];
