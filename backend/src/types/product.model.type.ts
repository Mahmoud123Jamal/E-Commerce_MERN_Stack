import { Document, Types } from "mongoose";

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

  category: string;

  imageUrl: string;

  multipleImages?: string[];

  comments: IComment[];

  averageRating: number;

  reviewsCount: number;

  createdAt: Date;

  updatedAt: Date;
}
