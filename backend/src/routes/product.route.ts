import express from "express";

import upload from "../middlewares/upload.middleware";

import {
  addComment,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductComments,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";
import { authRole } from "../middlewares/role.middleware";
import {
  addCommentValidator,
  createProductValidator,
  updateProductValidator,
} from "../validators/product.validator";
import { validationMiddleware } from "../middlewares/validation.middleware";

const router = express.Router();
/* ================= PRODUCTS ================= */

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post(
  "/",
  protect,
  authRole("admin"),
  upload.array("images", 5),
  createProductValidator,
  validationMiddleware,
  createProduct,
);

router.patch(
  "/:id",
  protect,
  authRole("admin"),
  upload.array("images", 5),
  updateProductValidator,
  validationMiddleware,
  updateProduct,
);

router.delete("/:id", protect, authRole("admin"), deleteProduct);

/* ================= COMMENTS ================= */

router.post(
  "/:id/comment",
  protect,
  addCommentValidator,
  validationMiddleware,
  addComment,
);
router.get("/:id/comments", getProductComments);

export default router;
