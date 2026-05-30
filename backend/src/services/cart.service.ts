import { Types } from "mongoose";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import type { ICart, ICartItem } from "../types/Cart.model.type";
import type { IProduct } from "../types/product.model.type";

const getProductIdString = (
  productField: Types.ObjectId | IProduct | undefined | null,
): string => {
  if (!productField) return "";
  return productField instanceof Types.ObjectId
    ? productField.toString()
    : (productField._id as string);
};

export const getUserCartService = async (userId: string) => {
  return await CartModel.findOne({ user: userId }).populate("items.product");
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await ProductModel.findById(productId);
  if (!product) throw new Error("Product not found");
  if (quantity > product.stock) throw new Error("Quantity exceeds stock");

  let cart = await CartModel.findOne<ICart>({ user: userId });
  if (!cart) {
    cart = await CartModel.create({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item: ICartItem) => getProductIdString(item.product) === productId,
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock)
      throw new Error("Quantity exceeds available stock");
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: product._id as Types.ObjectId,
      quantity,
    } as ICartItem);
  }

  cart.totalPrice = await calculateCartTotal(cart);
  await cart.save();
  return await cart.populate("items.product");
};

export const removeFromCartService = async (
  userId: string,
  productId: string,
) => {
  const cart = await CartModel.findOne<ICart>({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item: ICartItem) => getProductIdString(item.product) !== productId,
  );

  cart.totalPrice = await calculateCartTotal(cart);
  await cart.save();
  return await cart.populate("items.product");
};

export const clearCartService = async (userId: string) => {
  const cart = await CartModel.findOne<ICart>({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();
  return cart;
};

const calculateCartTotal = async (cart: ICart): Promise<number> => {
  if (!cart.items.length) return 0;

  const productIds: string[] = cart.items
    .map((item: ICartItem) => getProductIdString(item.product))
    .filter(Boolean);

  const products = await ProductModel.find({ _id: { $in: productIds } }).select(
    "_id price",
  );

  const productPriceMap = new Map<string, number>();
  products.forEach((product) => {
    productPriceMap.set(product._id as string, product.price);
  });

  let total = 0;
  cart.items.forEach((item: ICartItem) => {
    const price = productPriceMap.get(getProductIdString(item.product));
    if (price) {
      total += price * item.quantity;
    }
  });

  return total;
};

export const updateCartItemQuantityService = async (
  userId: string,
  productId: string,
  action: "increase" | "decrease",
) => {
  const cart = await CartModel.findOne<ICart>({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (cartItem: ICartItem) => getProductIdString(cartItem.product) === productId,
  );
  if (!item) throw new Error("Product not found in cart");

  if (action === "increase") {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Product not found");
    if (item.quantity >= product.stock)
      throw new Error("Cannot add more than available stock");
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (cartItem: ICartItem) =>
          getProductIdString(cartItem.product) !== productId,
      );
    }
  }

  cart.totalPrice = await calculateCartTotal(cart);
  await cart.save({ validateModifiedOnly: true });

  return await CartModel.findOne({ user: userId }).populate("items.product");
};
