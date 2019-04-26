import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteData } from "react-static";

import Header from "../containers/Header";
import LangSwitcher from "../containers/LangSwitcher";
import PostList from "../containers/PostList";
import TagCloud from "../containers/TagCloud";

export default () => {
  const { t, i18n } = useTranslation();
  let { posts, lang, isDefault, langRefs } = useRouteData();
  i18n.changeLanguage(lang);
  const [expanded, setExpanded] = useState(false);
  posts.sort(function(a, b) {
    return new Date(b.fileInfo.createdAt) - new Date(a.fileInfo.createdAt);
  });
  if (!expanded) {
    posts = posts.slice(0, 1);
  }

  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <Header />
      <main>
        <h2>{t("Recent")}</h2>
        <PostList posts={posts} />
        {!expanded && (
          <a
            onClick={() => setExpanded(true)}
            style={{ textAlign: "right", float: "right" }}
          >
            {t("More")}
          </a>
        )}
        <TagCloud
          isDefault={isDefault}
          lang={lang}
          tags={[
            { value: "tag1", hits: 2 },
            { value: "tag2", hits: 2 },
            { value: "tag3", hits: 1 },
            { value: "tag4", hits: 10 }
          ]}
        />
      </main>
    </div>
  );
};
