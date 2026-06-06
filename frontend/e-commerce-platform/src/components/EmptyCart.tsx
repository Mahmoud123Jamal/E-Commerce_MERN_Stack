import { memo } from "react";
import { ShoppingCart } from "lucide-react";
import type { TFunction } from "i18next";
import { useCartDrawer } from "../hooks/useCartDrawer";
interface EmptyCartProps {
  t: TFunction;
}

export const EmptyCart = memo(({ t }: EmptyCartProps) => {
  const { closeDrawer } = useCartDrawer();

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center max-w-sm mx-auto animate-fade-in">
      <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4 text-base-content/30">
        <ShoppingCart size={28} />
      </div>
      <h3 className="text-xl font-bold mb-1">{t("cartEmpty")}</h3>
      <p className="text-sm text-base-content/60 mb-6">
        {t("addProductsToCart")}
      </p>

      <button
        onClick={closeDrawer}
        className="btn btn-primary btn-sm rounded-xl px-6 cursor-pointer"
      >
        {t("continueShopping", "متابعة التسوق")}
      </button>
    </div>
  );
});

EmptyCart.displayName = "EmptyCart";
