import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import ProductCard from "./ProductCard";

import { itemVariants } from "../animations/products/productsPageVariants";

import { useProducts } from "../hooks/ProductsHook";
import type { Products } from "../types/productType";

function TopRatedProducts() {
  const { t } = useTranslation();

  const { data, isLoading } = useProducts({
    search: "",
    category: "All",
    page: 1,
  });

  const products = data?.data?.products || [];

  const topRatedProducts = [...products]
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section
      className="
        py-2
      "
    >
      <div className="mb-10 flex flex-col text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="text-yellow-500 fill-yellow-500" size={32} />
          <h2 className="text-4xl font-bold">{t("topRatedProducts")}</h2>
        </div>

        <p className="text-base-content/70 max-w-2xl mx-auto">
          {t("topRatedProductsDesc")}
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {topRatedProducts.map((product: Products) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TopRatedProducts;
