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

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  upload.array("images", 5),
  protect,
  authRole("admin"),
  createProduct,
);
router.get("/:id", getSingleProduct);
router.patch(
  "/:id",
  protect,
  authRole("admin"),
  upload.array("images", 5),
  updateProduct,
);
router.delete("/:id", protect, authRole("admin"), deleteProduct);
router.get("/:id/comments", getProductComments);
router.post("/:id/comment", protect, addComment);

export default router;
