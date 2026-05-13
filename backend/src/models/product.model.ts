import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product.model.type";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
