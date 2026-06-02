import { useAppDispatch } from "./reduxHooks";
import { addToCartThunk } from "./../features/cart/cartSlice";
import type { CartProduct } from "./../features/cart/cartTypes";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartProduct, quantity = 1) => {
    dispatch(
      addToCartThunk({
        productId: product._id,
        quantity,
      }),
    );
  };

  return { handleAddToCart };
};
