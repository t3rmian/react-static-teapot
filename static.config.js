import I18nIndexes from "./src/model/I18nIndexes";
import I18nSearch from "./src/model/I18nSearch";
import I18nTags from "./src/model/I18nTags";
import React from "react";
import jdown from "jdown";
import path from "path";

const siteRoot =
  process.env.NODE_ENV === "development"
    ? "https://localhost:3000"
    : "https://react-static-teapot.netlify.com";
const defaultLanguage = "en";
export default {
  siteRoot,
  getSiteData: () => ({
    siteRoot
  }),
  getRoutes: async () => {
    const blog = await jdown("content/posts", { fileInfo: true });
    const home = await jdown("content/home", { fileInfo: true });
    Object.keys(blog).forEach(lang =>
      blog[lang].sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    );
    return [
      ...I18nIndexes(blog, defaultLanguage, home),
      ...I18nTags(blog, defaultLanguage),
      ...I18nSearch(blog, defaultLanguage, home)
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
    [
      require.resolve("react-static-plugin-sitemap"),
      {
        getAttributes: route => {
          const attributes = {};
          const data = route.getData();
          if (data.post) {
            if (data.post.updated) {
              attributes.lastmod = new Date(data.post.updated).toISOString();
            } else if (data.post.date) {
              attributes.lastmod = new Date(data.post.date).toISOString();
            }
          } else if (data.date) {
            attributes.lastmod = data.date;
          }

          data.langRefs.map(ref => {
            const key = `xhtml:link rel="alternate" hreflang="${
              ref.lang
            }" href="${siteRoot}${ref.url}"`;
            attributes[key] = "";
            if (ref.lang === defaultLanguage) {
              const defaultKey = `xhtml:link rel="alternate" hreflang="x-default" href="${siteRoot}${
                ref.url
              }"`;
              attributes[defaultKey] = "";
            }
          });
          return attributes;
        }
      }
    ],
    require.resolve("react-static-plugin-sass")
  ],
  Document: ({ Html, Head, Body, children }) => {
    return(
    <Html lang="x-default">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b91d47" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Body>{children}</Body>
    </Html>
  )}
};
