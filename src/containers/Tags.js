import Header from "../containers/Header";
import LangSwitcher from "../containers/LangSwitcher";
import PostList from "./PostList";
import React from "react";
import TagCloud from "../containers/TagCloud";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  let { posts, lang, isDefaultLang, langRefs, tag, tags, root } = useRouteData();

  return (
    <div className="tags-container">
      <div className="page">
        <LangSwitcher langRefs={langRefs} />
        <Header root={root} />
        <h2 className="uppercase">{t("Posts by tag", { tag, lng: lang })}</h2>
        <PostList posts={posts} />
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
      </div>
    </div>
  );
};
