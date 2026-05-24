import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import {
  addCommentService,
  createProductService,
  deleteProductService,
  getProductsService,
  getSingleProductService,
  updateProductService,
} from "../services/ProductService";
import { useAppSelector } from "./reduxHooks";
import { selectUser } from "../features/auth/authSelectors";

export const useProducts = ({
  search,
  category,
  page,
}: {
  search: string;

  category: string;

  page: number;
}) => {
  return useQuery({
    queryKey: ["products", search, category, page],

    queryFn: () =>
      getProductsService({
        search,
        category,
        page,
      }),

    placeholderData: (previousData) => previousData,
  });
};

export const useSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () => getSingleProductService(id),

    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,

    onSuccess: () => {
      toast.success("Product created");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: () => {
      toast.error("Create failed");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductService,

    onSuccess: () => {
      toast.success("Product updated");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,

    onSuccess: () => {
      toast.success("Product deleted");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(selectUser);

  return useMutation({
    mutationFn: addCommentService,

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      await queryClient.cancelQueries({
        queryKey: ["product", newComment.productId],
      });

      const previousProducts = queryClient.getQueryData(["products"]);
      const previousProduct = queryClient.getQueryData([
        "product",
        newComment.productId,
      ]);

      const optimisticComment = {
        _id: Date.now().toString(),
        user: currentUser?._id,
        userName: currentUser?.name || "You",
        comment: newComment.comment,
        rating: Number(newComment.rating),
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(["products"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            products: old.data.products.map((product: any) => {
              if (product._id !== newComment.productId) return product;
              const updatedComments = [
                optimisticComment,
                ...(product.comments || []),
              ];
              const total = updatedComments.reduce(
                (sum: number, c: any) => sum + c.rating,
                0,
              );
              return {
                ...product,
                comments: updatedComments,
                reviewsCount: updatedComments.length,
                averageRating: total / updatedComments.length,
              };
            }),
          },
        };
      });

      queryClient.setQueryData(
        ["product", newComment.productId],
        (old: any) => {
          if (!old) return old;
          const updatedComments = [optimisticComment, ...(old.comments || [])];
          const total = updatedComments.reduce(
            (sum: number, c: any) => sum + c.rating,
            0,
          );
          return {
            ...old,
            comments: updatedComments,
            reviewsCount: updatedComments.length,
            averageRating: total / updatedComments.length,
          };
        },
      );

      return { previousProducts, previousProduct };
    },

    onError: (_err, variables, context) => {
      toast.error("Comment failed");
      queryClient.setQueryData(["products"], context?.previousProducts);
      queryClient.setQueryData(
        ["product", variables.productId],
        context?.previousProduct,
      );
    },

    onSuccess: () => {
      toast.success("Comment added");
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
    },
  });
};
