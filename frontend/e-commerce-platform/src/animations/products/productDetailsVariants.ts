import type { Variants } from "framer-motion";

export const detailsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const detailsItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const detailsImageVariants: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const detailsButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.1 },
  },
};

export const detailsCommentVariants = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: index * 0.05 },
  whileHover: { y: -3 },
});
