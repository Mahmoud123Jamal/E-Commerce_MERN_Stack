import type { Products } from "../types/productType";

const BASE_URL = "http://localhost:3001/uploads/products";

// export const buildProductImages = (product: Products) => {
//   if (product.multipleImages?.length > 0) {
//     return product.multipleImages.map((img: string) => ({
//       image: `${BASE_URL}/${img}`,
//       title: product.name,
//       description: product.description,
//     }));
//   }

//   return [
//     {
//       image: `${BASE_URL}/${product.imageUrl}`,
//       title: product.name,
//       description: product.description,
//     },
//   ];
// };

//this hardcode for test only

const STATIC_IMAGES = [
  "/test/images/slide1.jpg",
  "/test/images/slide2.jpeg",
  "/test/images/slide3.jpg",
  "/test/images/slide4.jpg",
  "/test/images/slide5.jpg",
];

export const buildProductImages = (product: Products) => {
  if (product.multipleImages && product.multipleImages.length > 0) {
    return product.multipleImages.map((img: string) => ({
      image: `${BASE_URL}/${img}`,
      title: product.name,
      description: product.description,
    }));
  }

  return STATIC_IMAGES.map((url, i) => ({
    image: url,
    title: `${product.name} - Slide ${i + 1}`,
    description: product.description,
  }));
};

export const hasUserCommented = (
  comments: { user: string }[],
  userId?: string,
): boolean => {
  if (!userId) return false;
  return comments.some((c) => c.user === userId);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString();
};

export const getAvatarLetter = (name?: string): string => {
  return name?.charAt(0).toUpperCase() ?? "?";
};

export const getStarClass = (index: number, value: number): string => {
  return index < value ? "text-warning fill-warning" : "text-base-content/20";
};
