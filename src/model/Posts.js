import i18n from '../i18n';

export default function Posts(blog, defaultLang, lang, tags) {
  i18n.changeLanguage(lang);
  const isDefaultLang = defaultLang === lang

  return blog[lang].map(post => ({
    path: `${i18n.t('posts')}/${post.id}`,
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
            url: `${lang}/${i18n.t('posts', lang)}/${post.id}`
          })),
        ...(blog[defaultLang].some(p => p.id === post.id)
          ? [{ lang: defaultLang, url: `/${i18n.t('posts', defaultLang)}/${post.id}` }]
          : [])
      ],
      tags
    })
  }));
}
