import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  getCartAPI,
  addToCartAPI,
  updateCartQuantityAPI,
  removeFromCartAPI,
} from "../features/cart/cartApi";
import type { Cart } from "../features/cart/cartTypes";

export const useCart = () => {
  const queryClient = useQueryClient();

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [queryClient]);

  const {
    data: cart,
    isLoading: loading,
    error: fetchError,
  } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await getCartAPI();
      return response.data.cart;
    },
    staleTime: 1000 * 60 * 5,
  });

  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity = 1,
    }: {
      productId: string;
      quantity?: number;
    }) => addToCartAPI(productId, quantity),
    onSuccess: invalidateCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      productId,
      action,
    }: {
      productId: string;
      action: "increase" | "decrease";
    }) => updateCartQuantityAPI(productId, action),
    onSuccess: invalidateCart,
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId: string) => removeFromCartAPI(productId),
    onSuccess: invalidateCart,
  });

  const isUpdating = updateQuantityMutation.isPending
    ? updateQuantityMutation.variables?.productId
    : removeItemMutation.isPending
      ? removeItemMutation.variables
      : addToCartMutation.isPending
        ? addToCartMutation.variables?.productId
        : null;

  return {
    cart,
    loading,
    error:
      fetchError ||
      updateQuantityMutation.error ||
      removeItemMutation.error ||
      addToCartMutation.error,
    isUpdating,
    isAdding: addToCartMutation.isPending,
    handleIncreaseQuantity: (id: string) =>
      !isUpdating &&
      updateQuantityMutation.mutate({ productId: id, action: "increase" }),
    handleDecreaseQuantity: (id: string, q: number) =>
      !isUpdating &&
      (q <= 1
        ? removeItemMutation.mutate(id)
        : updateQuantityMutation.mutate({ productId: id, action: "decrease" })),
    handleRemoveItem: (id: string) =>
      !isUpdating && removeItemMutation.mutate(id),
    handleAddToCart: (productId: string, quantity = 1) =>
      addToCartMutation.mutateAsync({ productId, quantity }),
  };
};
