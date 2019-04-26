import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteData } from 'react-static';

import LangSwitcher from '../containers/LangSwitcher';
import TagCloud from '../containers/TagCloud';
import PostList from './PostList';

export default () => {
  const { t, i18n } = useTranslation();
  let { posts, lang, isDefault, langRefs } = useRouteData();
  i18n.changeLanguage(lang);

  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <h1>{t("Tags")}</h1>
      <PostList posts={posts} />
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
    </div>
  );
};
