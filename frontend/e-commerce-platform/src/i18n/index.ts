import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

const getRawLang = (): "ar" | "en" => {
  try {
    const raw = localStorage.getItem("persist:root");
    if (!raw) return "ar";
    const parsed = JSON.parse(raw);
    const lang = JSON.parse(parsed.lang).lang;
    return lang === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
};

const savedLang = getRawLang();

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },

  lng: savedLang,

  fallbackLng: "ar",

  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = savedLang;

export default i18n;
