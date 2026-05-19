import ProductModel from "../models/product.model";
import { UserType } from "../types/User.model.type";

export const createProductService = async (
  data: any,
  files: Express.Multer.File[],
) => {
  const product = await ProductModel.create({
    name: data.name,
    description: data.description,
    price: Number(data.price),
    stock: Number(data.stock),
    category: data.category,

    imageUrl: files?.length ? `/uploads/products/${files[0].filename}` : "",
    multipleImages: files?.map((f) => `/uploads/products/${f.filename}`),

    comments: [],
    averageRating: 0,
    reviewsCount: 0,
  });

  return product;
};

export const getAllProductsService = async () => {
  return await ProductModel.find().sort("-createdAt");
};

export const getProductByIdService = async (id: string) => {
  return await ProductModel.findById(id);
};

export const updateProductService = async (
  id: string,
  data: any,
  files?: Express.Multer.File[],
) => {
  const product = await ProductModel.findById(id);

  if (!product) return null;

  if (data.name) product.name = data.name;
  if (data.description) product.description = data.description;
  if (data.price) product.price = Number(data.price);
  if (data.stock) product.stock = Number(data.stock);
  if (data.category) product.category = data.category;

  if (files?.length) {
    product.imageUrl = `/uploads/products/${files[0].filename}`;
    product.multipleImages = files.map(
      (f) => `/uploads/products/${f.filename}`,
    );
  }

  await product.save();
  return product;
};

export const deleteProductService = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const addCommentService = async (
  productId: string,
  user: UserType,
  comment: string,
  rating: number,
) => {
  const product = await ProductModel.findById(productId);

  if (!product) return null;
  // Anti Spam Review
  const alreadyReviewed = product.comments.find(
    (item) => item.user.toString() === user._id.toString(),
  );

  if (alreadyReviewed) {
    throw new Error("You already reviewed this product");
  }

  product.comments.push({
    user: user._id,
    userName: user.name,
    comment,
    rating,
    createdAt: new Date(),
  });

  const total = product.comments.reduce((sum, c) => sum + c.rating, 0);

  product.reviewsCount = product.comments.length;
  product.averageRating = total / product.comments.length;

  await product.save();

  return product;
};

export const getCommentsService = async (productId: string) => {
  const product = await ProductModel.findById(productId);

  if (!product) return null;

  const comments = [...product.comments].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    comments,
    averageRating: product.averageRating,
    reviewsCount: product.reviewsCount,
  };
};
