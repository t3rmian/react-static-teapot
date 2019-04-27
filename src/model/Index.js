import Posts from '../model/Posts';

export function gradeTags(posts) {
  const tags = [];
  posts.forEach(post => {
    if (post.tags != null) {
      post.tags.forEach(tag => {
        if (tags.some(t => t.value === tag)) {
          tags.find(t => t.value === tag).hits++;
        } else {
          tags.push({ value: tag, hits: 1 });
        }
      });
    }
  });
  return tags;
}

export default function Index(blog, defaultLang, lang) {
  const isDefaultLang = defaultLang === lang;
  const path = isDefaultLang ? "/" : `/${lang}/`;
  const tags = gradeTags(blog[lang]);

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
      ],
      tags
    }),
    children: Posts(blog, defaultLang, lang, tags)
  };
}
