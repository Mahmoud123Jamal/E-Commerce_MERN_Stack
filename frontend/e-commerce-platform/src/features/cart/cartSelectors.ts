import type { RootState } from "../../app/store";

export const selectCart = (state: RootState) => state.cart.cart;

export const selectCartLoading = (state: RootState) => state.cart.loading;

export const selectCartItemsCount = (state: RootState) =>
  state.cart.cart.items.reduce((acc, item) => acc + item.quantity, 0);
