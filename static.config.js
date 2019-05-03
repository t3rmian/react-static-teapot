import I18nIndexes from "./src/model/I18nIndexes";
import I18nTags from "./src/model/I18nTags";
import React from "react";
import jdown from "jdown";
import path from "path";

const siteRoot = "https://react-static-teapot.netlify.com";
export default {
  siteRoot,
  getSiteData: () => ({
    siteRoot
  }),
  getRoutes: async () => {
    const defaultLanguage = "en";
    const blog = await jdown("content/posts", { fileInfo: true });
    const home = await jdown("content/home", { fileInfo: true });
    Object.keys(blog).forEach(lang =>
      blog[lang].sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
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
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-sass")
  ],
  Document: ({ Html, Head, Body, children }) => (
    <Html lang={undefined}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>{children}</Body>
    </Html>
  )
};
