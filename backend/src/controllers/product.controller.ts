import { Request, Response } from "express";
import { catchAsync } from "./../utils/catchAsync";
import Product from "../models/product.model";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  if (!name || !description || !price || !stock) {
    return res
      .status(400)
      .json({ status: "fail", data: { message: "All fields are required" } });
  }
  const newProduct = await Product.create({ name, description, price, stock });
  res.status(201).json({ status: "success", data: { product: newProduct } });
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { name, description, price, stock },
    { new: true, runValidators: true },
  );

  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Product not found" } });
  }

  res.status(200).json({ status: "success", data: { product } });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Product not found" } });
  }

  res.status(204).json({ status: "success", data: null });
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Product not found" } });
  }

  res.status(200).json({ status: "success", data: { product } });
});

export const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json({ status: "success", data: { products } });
});
