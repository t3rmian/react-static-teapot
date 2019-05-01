import Header from "../components/Header";
import Languages from "../components/Languages";
import Posts from "../components/Posts";
import React from "react";
import TagCloud from "../containers/TagCloud";
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
    root
  } = useRouteData();

  return (
    <div className="tags-container">
      <div className="page">
        <Header root={root} />
        <h2 className="uppercase">{t("Posts by tag", { tag, lng: lang })}</h2>
        <Posts posts={posts} />
        <Languages langRefs={langRefs} />
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
      </div>
    </div>
  );
};
