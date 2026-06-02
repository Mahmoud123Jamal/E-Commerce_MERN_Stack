export interface ProductName {
  en: string;
  ar: string;
}

export interface CartProduct {
  _id: string;
  name: ProductName;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
  totalPrice: number;
}

export interface CartResponse {
  status: string;
  data: {
    cart: Cart;
  };
}
