import { memo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemType } from "../types/CartItemType";
import { toArabicNums } from "../utils/numberConverter";
interface CartItemProps {
  item: CartItemType;
  isRtl: boolean;
  isUpdating: string | null;
  onIncrease: (id: string, qty: number, key: string) => void;
  onDecrease: (id: string, qty: number, key: string) => void;
  onRemove: (id: string, key: string) => void;
  generateUniqueKey: (id: string) => string;
}

export const CartItem = memo(
  ({
    item,
    isRtl,
    isUpdating,
    onIncrease,
    onDecrease,
    onRemove,
    generateUniqueKey,
  }: CartItemProps) => {
    const { product, quantity } = item;
    const isMaxStock = quantity >= product.stock;

    const itemKey = generateUniqueKey(product._id);

    const isCurrentItemUpdating = isUpdating === product._id;
    return (
      <div
        className={`flex gap-4 p-4 border-b border-base-200 relative transition-all duration-200 ${
          isCurrentItemUpdating
            ? "opacity-60 pointer-events-none select-none"
            : ""
        }`}
      >
        <figure className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-base-200 border border-base-300 relative">
          <img
            src={product.imageUrl}
            alt={isRtl ? product.name.ar : product.name.en}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isCurrentItemUpdating && (
            <div className="absolute inset-0 bg-base-100/60 flex items-center justify-center">
              <span className="loading loading-spinner loading-xs text-primary" />
            </div>
          )}
        </figure>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-base-content line-clamp-2">
                {isRtl ? product.name.ar : product.name.en}
              </h3>
              <button
                onClick={() => onRemove(product._id, itemKey)}
                disabled={isCurrentItemUpdating}
                className="btn btn-ghost btn-circle btn-xs text-base-content/40 hover:text-error hover:bg-error/10 shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-base-content/50 mt-1 font-semibold">
              {isRtl
                ? toArabicNums(product.price.toFixed(2))
                : `$${product.price.toFixed(2)}`}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <div className="flex items-center bg-base-200 rounded-lg p-0.5 border border-base-300/40">
              <button
                onClick={() => onDecrease(product._id, quantity, itemKey)}
                disabled={isCurrentItemUpdating}
                className={`btn btn-ghost btn-xs btn-square rounded-md ${
                  quantity === 1
                    ? "text-error hover:bg-error/10"
                    : "text-base-content"
                }`}
              >
                {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
              </button>

              <span className="px-2 text-xs font-bold w-8 text-center select-none">
                {isRtl ? toArabicNums(quantity.toString()) : quantity}
              </span>

              <button
                onClick={() => onIncrease(product._id, quantity, itemKey)}
                disabled={isMaxStock || isCurrentItemUpdating}
                className="btn btn-ghost btn-xs btn-square rounded-md text-base-content"
              >
                <Plus size={12} />
              </button>
            </div>

            <div className="text-sm font-bold text-base-content">
              {isRtl
                ? toArabicNums((product.price * quantity).toFixed(2))
                : `$${(product.price * quantity).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CartItem.displayName = "CartItem";
