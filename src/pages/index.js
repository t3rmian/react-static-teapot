import React, { useState } from 'react';

import Header from '../containers/Header';
import LangSwitcher from '../containers/LangSwitcher';
import PostList from '../containers/PostList';
import TagCloud from '../containers/TagCloud';
import { useRouteData } from 'react-static';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t, i18n } = useTranslation();
  let { home, posts, lang, isDefaultLang, langRefs, tags } = useRouteData();
  i18n.changeLanguage(lang);
  const [expanded, setExpanded] = useState(false);
  posts.sort(function(a, b) {
    return new Date(b.fileInfo.createdAt) - new Date(a.fileInfo.createdAt);
  });
  if (!expanded) {
    posts = posts.slice(0, 1);
  } else {
    for (let i = 1; i < posts.length; i++) {
      posts[i].expanded = true;
    }
  }

  return (
    <div className="index-content">
      <LangSwitcher langRefs={langRefs} />
      <Header home={home} />
      <main>
        <h2 className="uppercase">{t("Recent")}</h2>
        <PostList posts={posts} />
        {!expanded && (
          <button
            className="link"
            onClick={() => setExpanded(true)}
            style={{ textAlign: "right", float: "right" }}
          >
            {t("More")}
          </button>
        )}
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
      </main>
    </div>
  );
};
