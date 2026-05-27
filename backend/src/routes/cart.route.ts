import { Router } from "express";
import {
  addToCartController,
  getUserCartController,
  removeFromCartController,
} from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware"; // استيراد ميرل وير الحماية الخاص بمشروعك

const router = Router();

router.use(protect);

router.get("/", getUserCartController);

router.post("/add", addToCartController);

router.delete("/remove/:productId", removeFromCartController);

export default router;
