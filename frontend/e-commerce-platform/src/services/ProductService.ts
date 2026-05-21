import { axiosInstance } from "../api/axiosInstance";
import type { GetProductsParams } from "../types/ProductsParamsType";

import type { Products } from "../types/productType";

export const getProductsService = async ({
  search = "",

  category = "",

  page = 1,

  limit = 8,
}: GetProductsParams) => {
  const response = await axiosInstance.get("/products", {
    params: {
      search,
      category,
      page,
      limit,
    },
  });

  return response.data;
};

export const getSingleProductService = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data.data.product as Products;
};

export const createProductService = async (formData: FormData) => {
  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProductService = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProductService = async (id: string) => {
  const response = await axiosInstance.delete(`/products/${id}`);

  return response.data;
};

type AddCommentParams = {
  productId: string;
  comment: string;
  rating: number;
};

export const addCommentService = async ({
  productId,
  comment,
  rating,
}: AddCommentParams) => {
  const response = await axiosInstance.post(`/products/${productId}/comment`, {
    comment,
    rating,
  });

  return response.data;
};
