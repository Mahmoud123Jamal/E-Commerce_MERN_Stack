import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShoppingCart,
  Star,
  Package,
  ArrowLeft,
  MessageSquare,
  Send,
  Calendar,
  User,
} from "lucide-react";

import { ImageSwiper } from "../components/ImageSwiper";
import { useSingleProduct, useAddComment } from "../hooks/ProductsHook";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectUser } from "../features/auth/authSelectors";
import Loading from "../components/Loading";

import {
  detailsButtonVariants,
  detailsImageVariants,
  detailsItemVariants,
  detailsContainerVariants,
  detailsCommentVariants,
} from "../animations/products/productDetailsVariants";

import {
  buildProductImages,
  hasUserCommented,
  formatDate,
  getAvatarLetter,
  getStarClass,
} from "../utils/productDetails.utils";
import type { Comments } from "../types/productType";
import { toArabicNums } from "../utils/numberConverter";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const formatNum = (num: string | number) =>
    isArabic ? toArabicNums(num) : num;

  const { data: product, isLoading } = useSingleProduct(id || "");
  const { mutate: addComment, isPending } = useAddComment();
  const currentUser = useAppSelector(selectUser);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Submits the form data to the server mutation handler
  const handleAddComment = () => {
    if (!comment.trim()) return;
    addComment(
      { productId: id || "", comment, rating },
      {
        onSuccess: () => {
          setComment("");
          setRating(5);
        },
      },
    );
  };

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4 animate-fade-in">
        <Package size={80} className="text-base-content/20 stroke-[1.5]" />
        <h2 className="text-2xl font-bold text-base-content/60">
          {t("productNotFound")}
        </h2>
      </div>
    );
  }

  // Pre-rendering payload transformations and validation checks
  const productImages = buildProductImages(product);
  const userAlreadyCommented = hasUserCommented(
    product.comments,
    currentUser?._id,
  );
  const isOutOfStock = product.stock === 0;

  return (
    <motion.section
      variants={detailsContainerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8"
    >
      {/* Navigation Layout - Breadcrumb link */}
      <motion.div variants={detailsItemVariants} className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors duration-200 group font-medium"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-1 cursor-pointer"
          />
          <span className="text-sm">{t("back")}</span>
        </button>
      </motion.div>

      {/* Main Container - Premium Card Frame Grid */}
      <div className="bg-base-100 border border-base-200 shadow-2xl rounded-4xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-300 hover:shadow-primary/5">
        {/* Gallery Section - Left Side Wrapper */}
        <motion.div
          variants={detailsImageVariants}
          className="lg:sticky lg:top-8 w-full z-10"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg bg-base-200 border border-base-300">
            <ImageSwiper images={productImages} />
          </div>
        </motion.div>

        {/* Product Information - Right Side Content Segment */}
        <motion.div
          variants={detailsItemVariants}
          className="flex flex-col gap-6 w-full"
        >
          {/* Metadata Badges - Category Tag and Stock Availability Indicators */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="badge badge-primary badge-outline px-4 py-3.5 text-xs font-bold uppercase tracking-wider">
              {t(product.category)}
            </span>

            {!isOutOfStock ? (
              <div className="flex items-center gap-2 bg-success/10 text-success border border-success/20 rounded-full px-4 py-1.5 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                {t("inStock")}
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-error/10 text-error border border-error/20 rounded-full px-4 py-1.5 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-error" />
                {t("outOfStock")}
              </div>
            )}
          </div>

          {/* Product Identification Headline */}
          <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Ratings Metric Overview Context */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-warning/10 border border-warning/20 rounded-xl px-3 py-1.5 shadow-sm">
              <Star size={16} className="text-warning fill-warning" />
              <span className="font-extrabold text-warning text-sm">
                {formatNum(product.averageRating?.toFixed(1) || "0.0") || "0.0"}
              </span>
            </div>
            <span className="text-base-content/50 text-xs font-medium bg-base-200 px-3 py-1.5 rounded-xl">
              {formatNum(product.reviewsCount)} {t("reviews")}
            </span>
          </div>

          <div className="h-px bg-base-200 my-2" />

          {/* Detailed Marketing/Product Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-2">
              {t("description")}
            </h3>
            <p className="text-base-content/70 leading-relaxed font-normal text-base">
              {product.description}
            </p>
          </div>

          {/* Checkout Parameters Panel - Price and Remaining Units */}
          <div className="flex items-end justify-between flex-wrap gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-200">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-1">
                {t("price")}
              </span>
              <span className="text-4xl font-black text-primary tracking-tight">
                {isArabic
                  ? `${toArabicNums(product.price)} $`
                  : `$${formatNum(product.price)}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 bg-base-100 px-3 py-2 rounded-xl border border-base-300 shadow-sm">
              <Package size={14} className="text-primary" />
              <span>
                {formatNum(product.stock)} {t("itemsLeft")}
              </span>
            </div>
          </div>

          {/* Action Trigger - Cart Submission Interface */}
          <motion.button
            variants={detailsButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            disabled={isOutOfStock}
            className="btn btn-primary btn-lg w-full px-8 gap-3 rounded-2xl font-bold shadow-xl shadow-primary/20 disabled:opacity-40 normal-case"
          >
            <ShoppingCart size={22} className="stroke-[2.5]" />
            {t("addToCart")}
          </motion.button>
        </motion.div>
      </div>

      {/* Review Management Architecture Section */}
      <motion.div
        variants={detailsItemVariants}
        className="mt-16 max-w-4xl mx-auto"
      >
        {/* Section Header Segment */}
        <div className="flex items-center gap-3 mb-8 border-b border-base-200 pb-4">
          <MessageSquare size={26} className="text-primary stroke-2" />
          <h2 className="text-2xl font-black tracking-tight">{t("reviews")}</h2>
          <span className="badge badge-primary font-bold px-2.5 py-3 text-xs">
            {formatNum(product.reviewsCount)}
          </span>
        </div>

        {/* Comment Entry Form Gate keeping Conditional */}
        {userAlreadyCommented ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 bg-base-200/60 border border-base-300 rounded-2xl p-6 mb-8 text-center"
          >
            <MessageSquare size={18} className="text-base-content/40" />
            <p className="text-base-content/60 text-sm font-semibold">
              {t("alreadyCommented")}
            </p>
          </motion.div>
        ) : (
          <div className="bg-base-100 border border-base-200 rounded-3xl p-6 md:p-8 mb-8 shadow-md">
            {/* Rating Stars Form Control Wrapper */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-sm font-bold text-base-content/80">
                {t("yourRating")}:
              </span>
              <div className="flex items-center gap-1.5 bg-base-200 px-3 py-1.5 rounded-xl border border-base-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoveredStar(i + 1)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform duration-100 hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={22}
                      className={`transition-colors ${getStarClass(i, hoveredStar || rating)}`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-base-content/40">
                ({rating} / 5)
              </span>
            </div>

            {/* Comment Body Input Control */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("writeReview")}
              rows={4}
              className="textarea textarea-bordered w-full bg-base-200/50 text-base-content border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:ring-4 focus:ring-primary/10 rounded-2xl resize-none transition-all duration-200 p-4 mb-4 text-base leading-relaxed"
            />

            {/* Action Trigger - Form Dispatch Action */}
            <div className="flex justify-end">
              <motion.button
                variants={detailsButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={handleAddComment}
                disabled={isPending || !comment.trim()}
                className="btn btn-primary px-6 gap-2 rounded-xl font-bold text-sm shadow-md disabled:opacity-40 normal-case"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Send size={14} className="stroke-[2.5]" />
                )}
                {t("addComment")}
              </motion.button>
            </div>
          </div>
        )}

        {/* Core Review Stream List Map Render */}
        {product.comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-base-200/40 rounded-3xl border border-base-200 border-dashed text-center">
            <MessageSquare
              size={40}
              className="text-base-content/20 stroke-[1.5]"
            />
            <p className="text-base-content/40 text-sm font-semibold">
              {t("noReviews")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {product.comments.map((item: Comments, index: number) => (
              <motion.div
                key={item._id || index}
                {...detailsCommentVariants(index)}
                className="bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-base-300 transition-all duration-200 flex flex-col gap-3"
              >
                {/* Meta-Header - Identity Profile Badge and Stars Context */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-base shadow-inner border border-primary/5">
                      {getAvatarLetter(item.userName)}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-sm text-base-content flex items-center gap-1.5">
                        <User size={12} className="text-base-content/40" />
                        {item.userName}
                      </h4>
                      <span className="text-[11px] text-base-content/40 flex items-center gap-1 mt-0.5 font-medium">
                        <Calendar size={10} />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Evaluated Local Rating Star Matrix Display */}
                  <div className="flex items-center gap-1 bg-warning/5 border border-warning/10 rounded-lg px-2 py-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={getStarClass(i, item.rating)}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Content Display Section */}
                <p className="text-base-content/80 text-sm leading-relaxed pl-1">
                  {item.comment}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProductDetails;
