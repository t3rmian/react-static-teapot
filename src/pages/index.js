import React, { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PostList from "../components/Posts";
import SearchBar from "../components/SearchBar";
import TagCloud from "../components/TagCloud";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  let {
    home,
    posts,
    lang,
    isDefaultLang,
    langRefs,
    tags,
    root
  } = useRouteData();
  const [expanded, setExpanded] = useState(false);
  posts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  if (!expanded) {
    posts = posts.slice(0, 1);
  }

  return (
    <div className="container index-container">
      <div className="page">
        <SearchBar root={root} lang={lang} />
        <Header
          home={home}
          root={root}
          seo={{
            title:
              t("site title", { lng: lang }) +
              ": " +
              t("blog template", { lng: lang }),
            description: home.contents,
            lang,
            date: new Date().toISOString(),
            type: "website",
            langRefs: langRefs,
            twitterContentUsername: t("twitter author", { lng: lang }),
            twitterCard: "summary"
          }}
        />
        <main>
          <h2 className="uppercase">{t("Recent", { lng: lang })}</h2>
          <PostList posts={posts} />
          {!expanded && (
            <div className="more">
              <button className="link" onClick={() => setExpanded(true)}>
                {t("More", { lng: lang })}
              </button>
            </div>
          )}
          <Footer langRefs={langRefs} />
          <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
        </main>
      </div>
    </div>
  );
};
