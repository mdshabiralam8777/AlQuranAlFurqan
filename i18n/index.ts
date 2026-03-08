import "intl-pluralrules";

import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";
import ur from "./locales/ur.json";

// The device's current locale (e.g. 'en-US' -> 'en')
const systemLocale = Localization.getLocales()[0]?.languageCode || "en";

export const defaultLanguage = ["en", "ar", "ur"].includes(systemLocale)
  ? systemLocale
  : "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ur: { translation: ur },
  },
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React handles XSS
  },
});

export default i18n;
