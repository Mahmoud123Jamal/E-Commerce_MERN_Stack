import { Router } from "express";
import {
  addToCartController,
  getUserCartController,
  removeFromCartController,
  updateCartItemQuantityController,
} from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.get("/", getUserCartController);

router.post("/add", addToCartController);

router.patch("/quantity", updateCartItemQuantityController);

router.delete("/remove/:productId", removeFromCartController);

export default router;
