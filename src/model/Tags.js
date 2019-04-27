import { flatMap } from '../utils';
import { gradeTags } from './Index';

export default function Tags(blog, defaultLang, lang) {
  const isDefaultLang = defaultLang === lang;
  const path = isDefaultLang ? "/tags/" : `/${lang}/tags/`;
  const postPath = isDefaultLang ? "/posts/" : `/${lang}/posts/`;
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
          path: `${postPath}${p.id}`
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
            url: `${lang}/tags/${tag}`
          })),
        ...(blog[defaultLang].some(p =>
          p.tags != null ? p.tags.some(t => t === tag) : false
        )
          ? [{ lang: defaultLang, url: `/tags/${tag}` }]
          : [])
      ],
      tag,
      tags: pageTags
    })
  }));
}
