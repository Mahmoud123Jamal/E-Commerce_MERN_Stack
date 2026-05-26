import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Star } from "lucide-react";

import { useTranslation } from "react-i18next";

import type { Products } from "../types/productType";

import {
  productButtonVariants,
  productCardVariants,
  productImageVariants,
} from "../animations/products/productCardVariants";
import { useCurrentLanguage, useIsArabic } from "../hooks/CurrentLanguage";
import { toArabicNums } from "../utils/numberConverter";

const ProductCard = ({ product }: { product: Products }) => {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const isArabic = useIsArabic();

  const formatNum = (num: string | number) =>
    isArabic ? toArabicNums(num) : num;
  return (
    <Link to={`/products/${product._id}`}>
      <motion.div
        variants={productCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        whileHover={{
          y: -8,
        }}
        className="
          card
          bg-base-100
          shadow-lg
          border
          border-base-300
          overflow-hidden
          hover:shadow-2xl
          transition-all
          duration-300
          cursor-pointer
        "
      >
        {/* real src : http://localhost:3001/uploads/products/${product.imageUrl} */}
        {/* third party image for test only */}
        <figure className="h-60 overflow-hidden">
          <motion.img
            variants={productImageVariants}
            initial="initial"
            whileHover="hover"
            src={`https://9to5mac.com/wp-content/uploads/sites/6/2023/09/iphone-15-pro-max-back.jpg`}
            alt={product.name[currentLanguage]}
            className="
              w-full
              h-full
              object-cover
            "
          />
        </figure>

        <motion.div initial="initial" whileHover="hover" className="card-body">
          <div className="badge badge-primary badge-outline">
            {t(product.category)}
          </div>

          <h2 className="card-title line-clamp-1">
            {product.name[currentLanguage]}
          </h2>

          <p className="text-sm text-base-content/70 line-clamp-2">
            {product.description[currentLanguage]}
          </p>

          <div className="text-2xl font-bold text-primary">
            {isArabic
              ? `${toArabicNums(product.price)} $`
              : `$${formatNum(product.price)}`}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="text-warning" size={15} />

              <span className="font-semibold">
                {formatNum(product.averageRating?.toFixed(1) || 0)}
              </span>
            </div>

            <span className="text-sm text-base-content/60">
              ({" "}
              {isArabic
                ? `${toArabicNums(product.reviewsCount)} `
                : `${formatNum(product.reviewsCount)} `}
              {t("reviews")})
            </span>
          </div>

          <div>
            {product.stock > 0 ? (
              <div className="badge badge-success">{t("inStock")}</div>
            ) : (
              <div className="badge badge-error">{t("outOfStock")}</div>
            )}
          </div>

          <div
            className="
              card-actions
              mt-4
              justify-between
              items-center
            "
          >
            <motion.button
              variants={productButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={(e) => e.preventDefault()}
              className="
                btn
                btn-outline
                btn-primary
                btn-sm
              "
            >
              {t("addToCart")}
            </motion.button>

            <motion.div
              variants={productButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="
                btn
                btn-primary
                btn-sm
              "
            >
              {t("viewDetails")}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
