import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts";
import React from "react";
import TagCloud from "../components/TagCloud";
import { capitalize } from "../utils.js";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  let {
    posts,
    lang,
    isDefaultLang,
    langRefs,
    tag,
    tags,
    root,
    noindex
  } = useRouteData();

  return (
    <div className="container tags-container">
      <div className="page">
        <Header
          root={root}
          seo={{
            title:
              capitalize(t("tags", { lng: lang })) +
              " - " +
              t("site title", { lng: lang }),
            description: tags.map(tag => tag.value).join(", "),
            lang,
            type: "website",
            langRefs: langRefs,
            twitterContentUsername: t("twitter author", { lng: lang }),
            twitterCard: "summary",
            noindex
          }}
        />
        <main>
          <h2 className="uppercase">{t("Posts by tag", { tag, lng: lang })}</h2>
          <Posts posts={posts} lang={lang} />
        </main>
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
        <Footer langRefs={langRefs} />
      </div>
    </div>
  );
};
