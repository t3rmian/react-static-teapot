import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "date=year+month+day": "{{date, year+month+day}}",
      "date=year+month": "{{date, year+month}}",
      Recent: "Recent",
      More: "More",
      "Scroll to bottom!": "Scroll to bottom!",
      "Scroll to top!": "Scroll to top!",
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  pl: {
    translation: {
      Recent: "Najnowsze",
      More: "Więcej",
      "Scroll to bottom!": "Przewiń na sam dół!",
      "Scroll to top!": "Przwiń na samą górę!",
      "Welcome to React": "Welcome to React and react-i18next"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
    format: function(value, format, lng) {
      if (value instanceof Date) {
        let options = {};
        if (format === "year+month") {
          options = { year: "numeric", month: "short" };
        } else if (format === "year+month+day") {
          options = { year: "numeric", month: "short", day: "numeric" };
        }
        return new Intl.DateTimeFormat(lng, options).format(value);
      }
      return value;
    }
  },

  react: {
    bindI18n: ''
  }
});

export default i18n;
