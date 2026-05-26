import { useState, useDeferredValue } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";

import ProductCard from "../components/ProductCard";

import Pagination from "../components/Pagination";

import { useProducts } from "../hooks/ProductsHook";

import { PRODUCT_CATEGORIES } from "../constants/productCategories";

import {
  containerVariants,
  itemVariants,
  topVariants,
} from "../animations/products/productsPageVariants";
import type { Products } from "../types/productType";
import Loading from "../components/Loading";
import { usePaginationScroll } from "../hooks/PaginationScroll";

const ProductsPage = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [category, setCategory] = useState("All");

  const [page, setPage] = usePaginationScroll(1);

  const { data, isLoading } = useProducts({
    search: deferredSearch,
    category,
    page,
  });

  const products = data?.data?.products || [];

  const totalPages = data?.totalPages || 1;

  return (
    <motion.div
      variants={containerVariants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        max-w-7xl
        mx-auto
        px-4
        py-10
      "
    >
      {/* SEARCH + FILTER */}
      <motion.div
        variants={topVariants}
        className="
          flex
          flex-col
          gap-6
          mb-10
        "
      >
        {/* SEARCH */}
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder={t("searchProducts")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            className="
              input
              input-bordered
              w-full
              max-w-2xl
              bg-base-100
              text-base-content
              border-base-300
              border-2
              focus:outline-none
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
              transition-all
              duration-300
            "
          />
        </div>

        {/* CATEGORY FILTER */}
        <div
          className="
            flex
            lg:justify-center
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
          "
        >
          <button
            onClick={() => {
              setCategory("All");

              setPage(1);
            }}
            className={`
              btn
              btn-sm
              whitespace-nowrap
              transition-all
              duration-300
              ${category === "All" ? "btn-primary text-white" : "btn-outline"}
            `}
          >
            {t("all")}
          </button>

          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);

                setPage(1);
              }}
              className={`
                btn
                btn-sm
                whitespace-nowrap
                transition-all
                duration-300
                ${category === cat ? "btn-primary text-white" : "btn-outline"}
              `}
            >
              {t(cat)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* LOADING */}
      {isLoading ? (
        <Loading />
      ) : products.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-20">
          <h2
            className="
              text-2xl
              font-bold
              text-base-content
            "
          >
            {t("noProductsFound")}
          </h2>
        </motion.div>
      ) : (
        <>
          {/* PRODUCTS */}
          <div
            className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-6
  "
          >
            {products.map((product: Products) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                whileHover={{
                  y: -8,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* PAGINATION */}
          <motion.div variants={itemVariants}>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ProductsPage;
