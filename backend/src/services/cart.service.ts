import { Types } from "mongoose";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import { ICart, ICartItem } from "../types/Cart.model.type";
import { IProduct } from "../types/product.model.type";

export const getUserCartService = async (userId: string) => {
  return await CartModel.findOne({ user: userId }).populate("items.product");
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await CartModel.findOne<ICart>({ user: userId });

  if (!cart) {
    cart = await CartModel.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item: ICartItem) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id as Types.ObjectId,
      quantity,
    } as ICartItem);
  }

  cart.totalPrice = await calculateCartTotal(cart);

  await cart.save();

  return await CartModel.findOne({ user: userId }).populate("items.product");
};

export const removeFromCartService = async (
  userId: string,
  productId: string,
) => {
  const cart = await CartModel.findOne<ICart>({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const updatedItems = cart.items.filter(
    (item: ICartItem) => item.product.toString() !== productId,
  );

  cart.items = updatedItems as any;

  cart.totalPrice = await calculateCartTotal(cart);

  await cart.save();

  return await CartModel.findOne({ user: userId }).populate("items.product");
};

const calculateCartTotal = async (cart: ICart) => {
  if (!cart.items || cart.items.length === 0) return 0;

  const productIds = cart.items.map((item) => item.product);

  const products = await ProductModel.find({ _id: { $in: productIds } });

  const productPriceMap = new Map<string, number>(
    products.map((p: IProduct) => [p._id as string, p.price]),
  );

  let total = 0;

  for (const item of cart.items) {
    const price = productPriceMap.get(item.product.toString());
    if (price !== undefined) {
      total += price * item.quantity;
    }
  }

  return total;
};
