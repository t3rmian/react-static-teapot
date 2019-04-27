import Index from "../model/Index";

export default function I18nIndexes(blog, defaultLang) {
  return Object.keys(blog).map(lang => Index(blog, defaultLang, lang));
}
