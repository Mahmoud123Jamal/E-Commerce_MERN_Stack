import type { Request, Response } from "express";
import { WishlistService } from "../services/wishlist.service";

export const getWishlist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const wishlist = await WishlistService.getOrCreateWishlist(userId);

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const toggleWishlistItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
      return;
    }

    const { wishlist, action } = await WishlistService.toggleItem(
      userId,
      productId,
    );
    const message =
      action === "added"
        ? "Product added to wishlist"
        : "Product removed from wishlist";

    res.status(200).json({ success: true, message, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const clearWishlist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const wishlist = await WishlistService.clearAll(userId);

    res
      .status(200)
      .json({ success: true, message: "Wishlist cleared", wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
