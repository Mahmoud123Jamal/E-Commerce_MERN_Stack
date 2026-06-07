import { X, AlertCircle } from "lucide-react";
import { useCartDrawer } from "../hooks/useCartDrawer";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export const CartDrawer = () => {
  const {
    cart,
    loading,
    error,
    isUpdating,
    uniqueKey,
    isRtl,
    t,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
    isOpen,
    closeDrawer,
  } = useCartDrawer();

  const cartItemsCount = cart?.items?.length || 0;

  return (
    <div
      className={`fixed inset-0 z-100 overflow-hidden transition-all duration-300 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`absolute inset-y-0 w-full max-w-md bg-base-100 text-base-content shadow-2xl flex flex-col h-full transition-transform duration-300 ease-in-out ${
          isRtl
            ? `left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
            : `right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-200 bg-base-100 sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-black tracking-tight">
              {t("shoppingCart")}
            </h2>
            <p className="text-xs text-base-content/50 mt-0.5">
              {cartItemsCount} {t("items")} {t("inYourCart")}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-error/10 text-error text-xs flex items-center gap-2 border-b border-error/20">
            <AlertCircle size={16} className="shrink-0" />
            <span>
              {t("cartErrorUpdate", "Something went wrong. Please try again.")}
            </span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : cartItemsCount === 0 ? (
          <EmptyCart t={t} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-base-100">
              {cart?.items.map((item: any, index: number) => (
                <CartItem
                  key={item.product._id || index}
                  item={item}
                  isRtl={isRtl}
                  isUpdating={isUpdating}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onRemove={handleRemoveItem}
                  generateUniqueKey={uniqueKey}
                />
              ))}
            </div>

            <CartSummary totalPrice={cart?.totalPrice || 0} t={t} />
          </>
        )}
      </div>
    </div>
  );
};
