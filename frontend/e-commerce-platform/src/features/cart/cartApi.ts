import { axiosInstance } from "../../api/axiosInstance";
import type { CartResponse } from "./cartTypes";

export const getCartAPI = async (): Promise<CartResponse> => {
  const { data } = await axiosInstance.get("/cart");

  return data;
};

export const addToCartAPI = async (
  productId: string,
  quantity = 1,
): Promise<CartResponse> => {
  const { data } = await axiosInstance.post("/cart/add", {
    productId,
    quantity,
  });

  return data;
};

export const removeFromCartAPI = async (
  productId: string,
): Promise<CartResponse> => {
  const { data } = await axiosInstance.delete(`/cart/remove/${productId}`);

  return data;
};

export const updateCartQuantityAPI = async (
  productId: string,
  action: "increase" | "decrease",
): Promise<CartResponse> => {
  const { data } = await axiosInstance.patch("/cart/quantity", {
    productId,
    action,
  });

  return data;
};
