import mongoose, { Schema } from "mongoose";
import type { IWishlist } from "../types/wishlist.type.ts";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishlistModel = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default WishlistModel;