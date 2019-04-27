import jdown from 'jdown';
import path from 'path';

import I18nIndexes from './src/model/I18nIndexes';
import I18nTags from './src/model/I18nTags';

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
      ...I18nIndexes(blog, defaultLanguage, home),
      ...I18nTags(blog, defaultLanguage)
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
