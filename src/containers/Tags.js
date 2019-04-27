import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteData } from "react-static";

import LangSwitcher from "../containers/LangSwitcher";
import TagCloud from "../containers/TagCloud";
import PostList from "./PostList";

export default () => {
  const { t, i18n } = useTranslation();
  let { posts, lang, isDefaultLang, langRefs, tag, tags } = useRouteData();
  i18n.changeLanguage(lang);

  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <h1>{t("Posts by tag", { tag })}</h1>
      <PostList posts={posts} />
      <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
    </div>
  );
};
