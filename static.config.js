import jdown from 'jdown';
import path from 'path';

export default {
  siteRoot: "https://d3v.netlify.com",
  getSiteData: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const defaultLanguage = "en";
    const blog = await jdown("content/posts", { fileInfo: true });
    const home = await jdown("content/home", { fileInfo: true });
    const concat = (x,y) => x.concat(y)
    const flatMap = (xs, f) => xs.map(f).reduce(concat, [])

    return [
      {
        path: "/",
        getData: () => ({
          home: home[defaultLanguage]
        })
      },
      ...Object.keys(blog).map((lang, page) => ({
        path: `/${lang}`,
        template: "src/pages/index",
        getData: () => ({
          home: home[lang]
        })
      })),
      {
        path: "/blog",
        getData: () => ({
          posts: blog[defaultLanguage],
          lang: defaultLanguage,
          isDefault: true
        }),
        children: blog[defaultLanguage].map(post => ({
          path: `/post/${post.id}`,
          template: "src/containers/Post",
          getData: () => ({
            post,
            lang: defaultLanguage,
            isDefault: true
          })
        }))
      },
      ...Object.keys(blog).map((lang, posts) => ({
        path: `/${lang}/blog/`,
        template: "src/pages/blog",
        getData: () => ({
          posts: blog[lang],
          lang: lang
        }),
        children: blog[lang].map(post => ({
          path: `/post/${post.id}`,
          template: "src/containers/Post",
          getData: () => ({
            post,
            lang: lang
          })
        }))
      })),
      ...[...new Set(flatMap(blog[defaultLanguage], post => post.tags))].map(
        tag => ({
          path: `/tags/${tag}`,
          template: "src/pages/blog",
          getData: () => ({
            posts: blog[defaultLanguage].filter(
              post => post.tags != null && post.tags.indexOf(tag) >= 0
            ),
            lang: defaultLanguage,
            isDefault: true
          })
        })
      ),
      ...flatMap(Object.keys(blog), (lang, posts) => (
        [...new Set(flatMap(blog[lang], post => post.tags))].map(tag => ({
          path: `/${lang}/tags/${tag}`,
          template: "src/pages/blog",
          getData: () => ({
            posts: blog[lang].filter(
              post => post.tags != null && post.tags.indexOf(tag) >= 0
            ),
            lang: lang
          })
        }))
      )),
      ...Object.keys(blog).map((lang, posts) => ({
        path: `/${lang}/blog/`,
        template: "src/pages/blog",
        getData: () => ({
          posts: blog[lang],
          lang: lang
        }),
        children: blog[lang].map(post => ({
          path: `/post/${post.id}`,
          template: "src/containers/Post",
          getData: () => ({
            post,
            lang: lang
          })
        }))
      }))
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
