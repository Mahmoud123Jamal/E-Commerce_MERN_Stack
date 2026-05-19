import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import { catchAsync } from "../utils/catchAsync";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  const files = req.files as Express.Multer.File[];

  if (!files?.length) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload product images",
    });
  }

  const product = await ProductModel.create({
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    category,
    imageUrl: files[0].filename,
    multipleImages: files.map((f) => f.filename),

    comments: [],
    averageRating: 0,
    reviewsCount: 0,
  });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

export const getAllProducts = catchAsync(
  async (_req: Request, res: Response) => {
    const products = await ProductModel.find().sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  },
);

export const getSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { product },
    });
  },
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  const { name, description, price, stock, category } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = Number(price);
  if (stock) product.stock = Number(stock);
  if (category) product.category = category;

  const files = req.files as Express.Multer.File[];

  if (files?.length) {
    product.imageUrl = files[0].filename;
    product.multipleImages = files.map((f) => f.filename);
  }

  await product.save();

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted",
  });
});

//ADD COMMENT
export const addComment = catchAsync(async (req: any, res: Response) => {
  const { comment, rating } = req.body;

  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "Not authenticated",
    });
  }

  if (!comment || !rating) {
    return res.status(400).json({
      status: "fail",
      message: "Comment and rating are required",
    });
  }

  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  const newComment = {
    user: req.user._id,
    userName: req.user.name,
    comment,
    rating: Number(rating),
    createdAt: new Date(),
  };

  product.comments.push(newComment);

  const totalRating = product.comments.reduce(
    (sum, c) => sum + (c.rating || 0),
    0,
  );

  product.reviewsCount = product.comments.length;
  product.averageRating = totalRating / product.comments.length;

  await product.save();

  res.status(201).json({
    status: "success",
    data: {
      comments: product.comments,
      averageRating: product.averageRating,
      reviewsCount: product.reviewsCount,
    },
  });
});

//GET COMMENTS
export const getProductComments = catchAsync(
  async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const comments = [...product.comments].sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    res.status(200).json({
      status: "success",
      data: {
        comments,
        averageRating: product.averageRating,
        reviewsCount: product.reviewsCount,
      },
    });
  },
);
