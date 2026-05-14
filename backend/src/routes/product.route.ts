import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} from "../controllers/product.controller";

const router = Router();
router.post("/addProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/:id", getProduct);
router.get("/getAllProducts", getAllProduct);

export default router;
