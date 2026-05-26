import { useState } from "react";
import { useAddComment } from "./ProductsHook";

export const useAddCommentHandler = (id: string | undefined) => {
  const { mutate: addComment, isPending } = useAddComment();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    if (!id) return;

    addComment(
      { productId: id, comment, rating },
      {
        onSuccess: () => {
          setComment("");
          setRating(5);
        },
      },
    );
  };

  return {
    comment,
    setComment,
    rating,
    setRating,
    hoveredStar,
    setHoveredStar,
    isPending,
    handleAddComment,
  };
};
