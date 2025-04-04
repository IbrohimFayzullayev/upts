import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "../../lang/ru.json";
import uz from "../../lang/uz.json";

const savedLanguage = localStorage.getItem("language") || "uz"; // Use saved language or fallback to 'en'

i18n.use(initReactI18next).init({
  resources: {
    uz,
    ru,
  },
  lng: savedLanguage,
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
