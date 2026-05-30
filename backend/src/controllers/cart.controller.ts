import type { Response } from "express";

import {
  addToCartService,
  getUserCartService,
  removeFromCartService,
  updateCartItemQuantityService,
} from "../services/cart.service";

import { catchAsync } from "../utils/catchAsync";

import type { AuthenticatedRequest } from "../types/AuthenticatedRequest.type";

export const getUserCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const cart = await getUserCartService(req.user!.id);

    return res.status(200).json({
      status: "success",

      data: {
        cart: cart || {
          items: [],
          totalPrice: 0,
        },
      },
    });
  },
);

export const addToCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const {
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "fail",

        message: "Product ID is required",
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: "fail",

        message: "Quantity must be greater than 0",
      });
    }

    const cart = await addToCartService(req.user!.id, productId, quantity);

    return res.status(200).json({
      status: "success",

      message: "Product added to cart",

      data: {
        cart,
      },
    });
  },
);

export const removeFromCartController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        status: "fail",

        message: "Product ID is required",
      });
    }

    const cart = await removeFromCartService(req.user!.id, productId);

    return res.status(200).json({
      status: "success",

      message: "Product removed from cart",

      data: {
        cart,
      },
    });
  },
);

export const updateCartItemQuantityController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "fail",
        data: {
          auth: "Unauthorized access",
        },
      });
    }

    const { productId, action } = req.body as {
      productId: string;
      action: "increase" | "decrease";
    };

    if (!productId || !action) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Product ID and action are required",
        },
      });
    }

    const cart = await updateCartItemQuantityService(
      req.user.id,
      productId,
      action,
    );

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  },
);
