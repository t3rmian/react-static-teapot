import i18n from '../i18n';

export default function Posts(blog, defaultLang, lang, tags, root) {
  const isDefaultLang = defaultLang === lang;

  return blog[lang].map(post => ({
    path: `${i18n.t("posts", { lng: lang })}/${post.url}`,
    template: "src/containers/Post",
    getData: () => ({
      post,
      lang,
      isDefaultLang,
      langRefs: [
        ...Object.keys(blog)
          .filter(lang => lang !== defaultLang)
          .filter(lang => blog[lang].some(p => p.id === post.id))
          .map(lang => ({
            lang,
            url: `${lang}/${i18n.t("posts", { lng: lang })}/${
              blog[lang].find(p => p.id === post.id).url
            }`
          })),
        ...(blog[defaultLang].some(p => p.id === post.id)
          ? [
              {
                lang: defaultLang,
                url: `/${i18n.t("posts", { lng: defaultLang })}/${
                  blog[lang].find(p => p.id === post.id).url
                }`
              }
            ]
          : [])
      ],
      tags,
      root
    })
  }));
}
