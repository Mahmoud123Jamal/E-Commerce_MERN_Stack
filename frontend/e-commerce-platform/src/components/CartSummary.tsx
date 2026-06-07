import { memo } from "react";
import type { TFunction } from "i18next";

interface CartSummaryProps {
  totalPrice: number;
  t: TFunction;
}

export const CartSummary = memo(({ totalPrice, t }: CartSummaryProps) => {
  return (
    <div className="p-4 border-t border-base-200 bg-base-200/30 sticky bottom-0 z-10 backdrop-blur-md">
      <div className="space-y-2 text-sm font-medium mb-4">
        <div className="flex items-center justify-between text-base-content/70">
          <span>{t("subtotal")}</span>
          <span className="text-base-content font-bold">
            $
            {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center justify-between text-base-content/70">
          <span>{t("shipping")}</span>
          <span className="text-success font-bold">{t("free")}</span>
        </div>

        <div className="divider my-1" />

        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-black">{t("total")}</span>
          <div className="text-right">
            <span className="text-xl font-black text-primary">
              $
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <p className="text-[9px] text-base-content/40 mt-0.5">
              {t("vatIncluded")}
            </p>
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-block rounded-xl shadow-md font-bold text-base transition-all duration-200 hover:shadow-lg">
        {t("checkout")}
      </button>
    </div>
  );
});

CartSummary.displayName = "CartSummary";
