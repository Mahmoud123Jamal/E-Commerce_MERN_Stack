import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  updateCartQuantityAPI,
} from "./cartApi";

import type { Cart } from "./cartTypes";

interface CartState {
  cart: Cart;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: {
    items: [],
    totalPrice: 0,
  },
  loading: false,
  error: null,
};

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const response = await getCartAPI();
      return response.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (
    payload: {
      productId: string;
      quantity?: number;
    },
    thunkAPI,
  ) => {
    try {
      const response = await addToCartAPI(payload.productId, payload.quantity);
      return response.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add to cart",
      );
    }
  },
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, thunkAPI) => {
    try {
      const response = await removeFromCartAPI(productId);
      return response.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove item",
      );
    }
  },
);

export const updateCartQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async (
    payload: {
      productId: string;
      action: "increase" | "decrease";
    },
    thunkAPI,
  ) => {
    try {
      const response = await updateCartQuantityAPI(
        payload.productId,
        payload.action,
      );
      return response.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.cart = {
        items: [],
        totalPrice: 0,
      };
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch cart";
      })

      .addCase(addToCartThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addToCartThunk.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
        },
      )
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to add item";
      })

      .addCase(removeFromCartThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        removeFromCartThunk.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
        },
      )
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to remove item";
      })

      .addCase(updateCartQuantityThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateCartQuantityThunk.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
        },
      )
      .addCase(updateCartQuantityThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to update quantity";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
