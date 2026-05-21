import { Document, Types } from "mongoose";

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Stationery",
  "Automotive",
] as const;

export type CategoryType = (typeof PRODUCT_CATEGORIES)[number];

export interface IComment {
  user: Types.ObjectId;
  userName: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryType;
  imageUrl: string;
  multipleImages?: string[];
  comments: IComment[];
  averageRating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
