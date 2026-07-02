import { Router } from "express";
import { getWishlist, toggleWishlistItem, clearWishlist } from "../controllers/wishlist.controller";
import { protect } from "../middlewares/auth.middleware"; 
const router = Router();

router.use(protect);

router.route("/").get(getWishlist).post(toggleWishlistItem).delete(clearWishlist);

export default router;