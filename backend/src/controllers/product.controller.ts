import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  addCommentService,
  getCommentsService,
} from "../services/product.service";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await createProductService(
    req.body,
    req.files as Express.Multer.File[],
  );

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

export const getAllProducts = catchAsync(async (_req, res: Response) => {
  const products = await getAllProductsService();

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

export const getSingleProduct = catchAsync(async (req, res: Response) => {
  const product = await getProductByIdService(req.params.id);

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
});

export const updateProduct = catchAsync(async (req, res: Response) => {
  const product = await updateProductService(
    req.params.id,
    req.body,
    req.files as Express.Multer.File[],
  );

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
});

export const deleteProduct = catchAsync(async (req, res: Response) => {
  const product = await deleteProductService(req.params.id);

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

export const addComment = catchAsync(async (req: any, res: Response) => {
  const product = await addCommentService(
    req.params.id,
    req.user,
    req.body.comment,
    Number(req.body.rating),
  );

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      comments: product.comments,
      averageRating: product.averageRating,
      reviewsCount: product.reviewsCount,
    },
  });
});

export const getProductComments = catchAsync(async (req, res: Response) => {
  const data = await getCommentsService(req.params.id);

  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data,
  });
});
