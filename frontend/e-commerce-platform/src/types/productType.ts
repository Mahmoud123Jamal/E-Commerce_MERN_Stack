import type { ProductCategory } from "../constants/productCategories";

export interface Comments {
  _id?: string;
  user: string;

  userName: string;

  comment: string;

  rating: number;

  createdAt: string;
}

export interface Products {
  _id: string;

  name: string;

  description: string;

  price: number;

  stock: number;

  category: ProductCategory;

  imageUrl: string;

  multipleImages: string[];

  comments: Comments[];

  averageRating: number;

  reviewsCount: number;

  createdAt: string;
}
