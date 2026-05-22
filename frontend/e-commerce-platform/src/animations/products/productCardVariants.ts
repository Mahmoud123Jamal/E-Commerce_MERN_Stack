import type { Variants } from "framer-motion";

export const productCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.9,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const productImageVariants: Variants = {
  initial: {
    scale: 1,
  },

  hover: {
    scale: 1.08,

    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const productButtonVariants: Variants = {
  initial: {
    scale: 1,
  },

  hover: {
    scale: 1.05,
  },

  tap: {
    scale: 0.95,
  },
};
