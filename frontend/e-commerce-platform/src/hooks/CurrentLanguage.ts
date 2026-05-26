import { useTranslation } from "react-i18next";

export const useCurrentLanguage = (): "en" | "ar" => {
  const { i18n } = useTranslation();
  return (i18n.language?.startsWith("ar") ? "ar" : "en") as "en" | "ar";
};
export const useIsArabic = (): boolean => {
  const { i18n } = useTranslation();
  return i18n.language === "ar";
};
