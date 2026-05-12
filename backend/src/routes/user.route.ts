import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/user.controller";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/user.validator";
const router = Router();
router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/:id", getUserInfo);

export default router;
