import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./translations/uz.json";
import ru from "./translations/ru.json";
import en from "./translations/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: "uz",
    fallbackLng: "uz",
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    detection: {
      order: ["cookie"], //  cookie orqali o‘qiydi
      caches: ["cookie"], //   cookie ga saqlaydi
      cookieMinutes: 60 * 24 * 30, // 30 kun
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
