import { Response } from "express";
import {
  addToCartService,
  getUserCartService,
  removeFromCartService,
} from "../services/cart.service";
import { catchAsync } from "../utils/catchAsync";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.type";

export const getUserCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "fail",
        data: { auth: "Unauthorized access" },
      });
    }

    const cart = await getUserCartService(req.user.id);

    if (!cart) {
      return res.status(200).json({
        status: "success",
        data: {
          cart: { user: req.user.id, items: [], totalPrice: 0 },
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: { cart },
    });
  },
);

export const addToCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "fail",
        data: { auth: "Unauthorized access" },
      });
    }

    const { productId, quantity } = req.body as {
      productId: string;
      quantity: number;
    };

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        status: "fail",
        data: {
          productId: "Product ID is required",
          quantity: "Quantity must be greater than 0",
        },
      });
    }

    const cart = await addToCartService(
      req.user.id,
      productId,
      Number(quantity),
    );

    res.status(200).json({
      status: "success",
      data: { cart },
    });
  },
);

export const removeFromCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "fail",
        data: { auth: "Unauthorized access" },
      });
    }

    const { productId } = req.params as { productId: string };

    if (!productId) {
      return res.status(400).json({
        status: "fail",
        data: { productId: "Product ID is required" },
      });
    }

    const cart = await removeFromCartService(req.user.id, productId);

    res.status(200).json({
      status: "success",
      data: { cart },
    });
  },
);
