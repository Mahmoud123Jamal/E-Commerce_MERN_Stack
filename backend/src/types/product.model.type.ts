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

export interface ILocalizedField {
  en: string;
  ar: string;
}
export interface IProduct extends Document {
  name: ILocalizedField;
  description: ILocalizedField;
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

export type IProductInput = Omit<
  IProduct,
  | keyof import("mongoose").Document
  | "imageUrl"
  | "multipleImages"
  | "comments"
  | "averageRating"
  | "reviewsCount"
  | "createdAt"
  | "updatedAt"
> & {
  price: string | number;
  stock: string | number;
};

export type IProductUpdateInput = Partial<
  Omit<IProductInput, "name" | "description">
> & {
  name?: Partial<IProduct["name"]>;
  description?: Partial<IProduct["description"]>;
};
