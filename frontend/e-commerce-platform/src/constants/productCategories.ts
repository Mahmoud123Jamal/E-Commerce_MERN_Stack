export const PRODUCT_CATEGORIES = [
  "Electronics",

  "Fashion",

  "Home & Kitchen",

  "Beauty & Personal Care",

  "Sports & Outdoors",

  "Toys & Games",

  "Books & Stationery",

  "Automotive",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
