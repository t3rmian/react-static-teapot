import Posts from '../model/Posts';

export default function Index(blog, defaultLang, lang) {
  const isDefaultLang = defaultLang === lang
  const path = isDefaultLang ? "/" : `/${lang}/`;

  return {
    path,
    template: "src/pages/index",
    getData: () => ({
      posts: blog[lang].map(p => ({
        ...p,
        path: `${path}posts/${p.id}`
      })),
      lang,
      isDefaultLang,
      langRefs: [
        ...Object.keys(blog)
          .filter(lang => lang !== defaultLang)
          .map(lang => ({
            lang,
            url: `/${lang}`
          })),
        { lang: defaultLang, url: "/" }
      ]
    }),
    children: Posts(blog, defaultLang, lang)
  };
}
