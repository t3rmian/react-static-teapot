import jdown from "jdown";
import path from "path";
import { flatMap } from './src/utils.js';
import I18nIndexes from './src/model/I18nIndexes';

export default {
  siteRoot: "https://react-static-teapot.netlify.com",
  getSiteData: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const defaultLanguage = "en";
    const blog = await jdown("content/posts", { fileInfo: true });
    const home = await jdown("content/home", { fileInfo: true });
    Object.keys(blog).forEach(lang =>
      blog[lang].sort(function(a, b) {
        return new Date(b.fileInfo.createdAt) - new Date(a.fileInfo.createdAt);
      })
    );
    return [
      ...I18nIndexes(blog, defaultLanguage),
      ...[...new Set(flatMap(blog[defaultLanguage], post => post.tags))].map(
        tag => ({
          path: `/tags/${tag}`,
          template: "src/containers/Tags",
          getData: () => ({
            posts: blog[defaultLanguage]
              .filter(post => post.tags != null && post.tags.indexOf(tag) >= 0)
              .map(p => ({
                ...p,
                path: `/posts/${p.id}`
              })),
            lang: defaultLanguage,
            isDefault: true,
            langRefs: [
              ...Object.keys(blog)
                .filter(lang => lang !== defaultLanguage)
                .filter(lang =>
                  blog[lang].some(p =>
                    p.tags != null ? p.tags.some(t => t === tag) : false
                  )
                )
                .map(lang => ({
                  lang,
                  url: `${lang}/tags/${tag}`
                })),
              ...(blog[defaultLanguage].some(p =>
                p.tags != null ? p.tags.some(t => t === tag) : false
              )
                ? [{ lang: defaultLanguage, url: `/tags/${tag}` }]
                : [])
            ]
          })
        })
      ),
      ...flatMap(Object.keys(blog), (lang, posts) =>
        [...new Set(flatMap(blog[lang], post => post.tags))].map(tag => ({
          path: `/${lang}/tags/${tag}`,
          template: "src/containers/Tags",
          getData: () => ({
            posts: blog[lang]
              .filter(post => post.tags != null && post.tags.indexOf(tag) >= 0)
              .map(p => ({
                ...p,
                path: `/${lang}/posts/${p.id}`
              })),
            lang: lang,
            langRefs: [
              ...Object.keys(blog)
                .filter(lang => lang !== defaultLanguage)
                .filter(lang =>
                  blog[lang].some(p =>
                    p.tags != null ? p.tags.some(t => t === tag) : false
                  )
                )
                .map(lang => ({
                  lang,
                  url: `${lang}/tags/${tag}`
                })),
              ...(blog[defaultLanguage].some(p =>
                p.tags != null ? p.tags.some(t => t === tag) : false
              )
                ? [{ lang: defaultLanguage, url: `/tags/${tag}` }]
                : [])
            ]
          })
        }))
      )
    ];
  },
  plugins: [
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages").replace(/\\/g, "/")
      }
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap")
  ]
};
