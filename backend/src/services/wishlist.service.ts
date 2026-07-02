import { Types } from "mongoose";
import WishlistModel from "../models/wishlist.model";
import type { IWishlist } from "../types/wishlist.type";

export class WishlistService {
  public static async getOrCreateWishlist(userId: string | Types.ObjectId): Promise<IWishlist> {
    let wishlist = await WishlistModel.findOne({ user: userId }).populate("products");
    
    if (!wishlist) {
      wishlist = await WishlistModel.create({ user: userId, products: [] });
    }
    
    return wishlist;
  }

  public static async toggleItem(
    userId: string | Types.ObjectId, 
    productId: string
  ): Promise<{ wishlist: IWishlist; action: "added" | "removed" }> {
    let wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await WishlistModel.create({ 
        user: userId, 
        products: [new Types.ObjectId(productId)] 
      });
      return { wishlist, action: "added" };
    }

    const prodId = new Types.ObjectId(productId);
    const productIndex = wishlist.products.findIndex((id) => id.equals(prodId));

    let action: "added" | "removed";

    if (productIndex > -1) {
      wishlist.products.splice(productIndex, 1);
      action = "removed";
    } else {
      wishlist.products.push(prodId);
      action = "added";
    }

    await wishlist.save();
    return { wishlist, action };
  }

  public static async clearAll(userId: string | Types.ObjectId): Promise<IWishlist | null> {
    return await WishlistModel.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );
  }
}