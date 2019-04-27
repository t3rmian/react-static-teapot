import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      defaultLang: "en",
      "date=year+month+day": "{{date, year+month+day}}",
      "date=year+month": "{{date, year+month}}",
      Recent: "Recent",
      "Posts by tag": "Posts by tag: {{tag}}",
      More: "More...",
      "Search results": "Search results for any of the following query parts: {{parts}}",
      "Empty query": "Oops, empty query...",
      "No content": "Oh snap! We don't have such content yet. But come back later. Maybe we will write about it.",
      posts: "posts",
      tags: "tags",
      search: "search"
    }
  },
  pl: {
    translation: {
      Recent: "Najnowsze",
      "Posts by tag": "Artykuły według etykiety: {{tag}}",
      More: "Więcej...",
      "Search results": "Rezultaty wyszukiwania dla następujących części zapytania: {{parts}}",
      "Empty query": "Ups, puste zapytanie...",
      "No content": "O nie! Nie mamy jeszcze takiej zawartości. Ale wpadnij później. Może wkrótce coś o tym napiszemy.",
      posts: "posty",
      tags: "tagi",
      search: "szukaj"
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
          options = { month: "long", day: "numeric" };
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
