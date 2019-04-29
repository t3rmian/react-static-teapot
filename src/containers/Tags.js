import LangSwitcher from "../containers/LangSwitcher";
import PostList from "./PostList";
import React from "react";
import TagCloud from "../containers/TagCloud";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  let { posts, lang, isDefaultLang, langRefs, tag, tags } = useRouteData();

  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <h1>{t("Posts by tag", { tag, lng: lang })}</h1>
      <PostList posts={posts} />
      <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
    </div>
  );
};
