import i18n from '../i18n';
import { flatMap } from '../utils';
import { gradeTags } from './Index';

export default function Tags(blog, defaultLang, lang) {
  const isDefaultLang = defaultLang === lang;
  const path = isDefaultLang
    ? `/${i18n.t("tags", {lng: lang})}/`
    : `/${lang}/${i18n.t("tags", {lng: lang})}/`;
  const postPath = isDefaultLang
    ? `/${i18n.t("posts", {lng: lang})}/`
    : `/${lang}/${i18n.t("posts", {lng: lang})}/`;
  const tags = [...new Set(flatMap(blog[lang], post => post.tags))];
  const pageTags = gradeTags(blog[lang]);

  return tags.map(tag => ({
    path: `${path}${tag}`,
    template: "src/containers/Tags",
    getData: () => ({
      posts: blog[lang]
        .filter(post => post.tags != null && post.tags.indexOf(tag) >= 0)
        .map(p => ({
          ...p,
          path: `${postPath}${p.url}`
        })),
      lang,
      isDefaultLang,
      langRefs: [
        ...Object.keys(blog)
          .filter(lang => lang !== defaultLang)
          .filter(lang =>
            blog[lang].some(p =>
              p.tags != null ? p.tags.some(t => t === tag) : false
            )
          )
          .map(lang => ({
            lang,
            url: `${lang}/${i18n.t("tags", lang)}/${tag}`
          })),
        ...(blog[defaultLang].some(p =>
          p.tags != null ? p.tags.some(t => t === tag) : false
        )
          ? [
              {
                lang: defaultLang,
                url: `/${i18n.t("tags", { lng: defaultLang })}/${tag}`
              }
            ]
          : [])
      ],
      tag,
      tags: pageTags
    })
  }));
}
