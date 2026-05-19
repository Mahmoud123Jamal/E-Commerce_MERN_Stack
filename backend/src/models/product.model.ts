import mongoose, { Schema } from "mongoose";

import type { IComment, IProduct } from "../types/product.model.type";

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    multipleImages: {
      type: [String],
      default: [],
    },

    comments: {
      type: [commentSchema],
      default: [],
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
