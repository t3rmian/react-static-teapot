export default function Posts(blog, defaultLang, lang, tags) {
  const isDefaultLang = defaultLang === lang

  return blog[lang].map(post => ({
    path: `posts/${post.id}`,
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
            url: `${lang}/posts/${post.id}`
          })),
        ...(blog[defaultLang].some(p => p.id === post.id)
          ? [{ lang: defaultLang, url: `/posts/${post.id}` }]
          : [])
      ],
      tags
    })
  }));
}
