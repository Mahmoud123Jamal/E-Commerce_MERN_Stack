import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/user.controller";
import {
  loginValidator,
  registerValidator,
} from "../validators/user.validator";
import { validationMiddleware } from "../middlewares/validation.middleware";
const router = Router();
router.post("/register", registerValidator, validationMiddleware, registerUser);
router.post("/login", loginValidator, validationMiddleware, loginUser);
router.get("/:id", getUserInfo);

export default router;
