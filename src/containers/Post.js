import { Link } from 'components/Router';
import React from 'react';
import { useRouteData } from 'react-static';

import LangSwitcher from '../containers/LangSwitcher';
import TagCloud from '../containers/TagCloud';

export default function Post() {
  const { post, isDefaultLang, lang, langRefs, tags } = useRouteData();
  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <Link to="/">{"<"} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
    </div>
  );
}
