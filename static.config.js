import jdown from 'jdown';
import path from 'path';

export default {
  siteRoot: 'https://d3v.netlify.com',
  getSiteData: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const defaultLanguage = "en";
    const blog = await jdown("content/posts", { fileInfo: true });
    const home = await jdown("content/home", { fileInfo: true });

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
          lang: lang,
          isDefault: false
        }),
        children: blog[lang].map(post => ({
          path: `/post/${post.id}`,
          template: "src/containers/Post",
          getData: () => ({
            post,
            lang: lang,
            isDefault: false
          })
        }))
      }))
    ];
  },
  plugins: [
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages").replace(/\\/g, '/'),
      }
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap")
  ]
};
