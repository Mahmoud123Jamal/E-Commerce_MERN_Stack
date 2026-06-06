import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "./useCart";

let globalIsOpen = false;
let globalListeners: Array<(value: boolean) => void> = [];

export const useCartDrawer = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpenState] = useState(globalIsOpen);

  const cartData = useCart();

  useEffect(() => {
    globalListeners.push(setIsOpenState);
    setIsOpenState(globalIsOpen);

    return () => {
      globalListeners = globalListeners.filter((l) => l !== setIsOpenState);
    };
  }, []);

  const setIsOpen = useCallback((value: boolean) => {
    globalIsOpen = value;
    globalListeners.forEach((listener) => {
      if (typeof listener === "function") listener(value);
    });
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen(!globalIsOpen);
  }, [setIsOpen]);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const isRtl = useMemo(() => i18n.language === "ar", [i18n.language]);

  return {
    ...cartData,
    isOpen,
    setIsOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    isRtl,
    t,
    uniqueKey: (productId: string) => `cart-item-${productId}`,
  };
};
