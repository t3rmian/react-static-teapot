import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { prefetch } from 'react-static';

import LangSwitcher from '../containers/LangSwitcher';
import TagCloud from '../containers/TagCloud';
import { countSubstrings } from '../utils.js';
import PostList from './PostList';

function Loader() {
  return <b>Loading ...</b>;
}

async function AsyncSearch(props) {
  const path = props.location.pathname;
  const { t, i18n } = props;
  let { posts, lang, isDefaultLang, langRefs } = await prefetch(
    props.lang == null ? "/" : "/" + props.lang
  );
  i18n.changeLanguage(lang);

  const [, query] = props.location.href.split(path);
  langRefs = langRefs.map(lr => mapLangRefWithQuery(lr, query));
  const words = decodeURIComponent(query)
    .replace(/[.,]/g, " ")
    .replace(/\s\s+/g, " ")
    .replace(/\?q=/g, " ")
    .split(" ")
    .filter(Boolean);
  const matchingPosts = posts
    .map(post => gradePost(post))
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score);

  let header;
  if (words.length > 0) {
    header = (
      <div>
        {t("Search results")}
        {" " + words.map(word => '"' + word + '"').join(", ")}
      </div>
    );
  } else {
    header = <div>{t("Empty query")}</div>;
  }

  let content;
  if (matchingPosts.length > 0) {
    content = <PostList posts={matchingPosts} />;
  } else {
    content = <div>{t("No content")}</div>;
  }
  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      {header}
      {content}
      <TagCloud
        isDefaultLang={isDefaultLang}
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

  function mapLangRefWithQuery(langRef, query) {
    return {
      ...langRef,
      url:
        (langRef.url.endsWith("/")
          ? `${langRef.url}search`
          : `${langRef.url}/search`) + query
    };
  }

  function gradePost(post) {
    const titleHits = words
      .map(word => countSubstrings(post.title, word))
      .reduce((a, b) => a + b, 0);
    const tagHits = words
      .map(word =>
        post.tags != null ? countSubstrings(post.tags.join(" "), word) : 0
      )
      .reduce((a, b) => a + b, 0);
    const contentHits = words
      .map(word => countSubstrings(post.contents, word))
      .reduce((a, b) => a + b, 0);
    return {
      ...post,
      titleHits,
      tagHits,
      contentHits,
      score: Math.pow(titleHits, 3) + Math.pow(tagHits, 2) + contentHits
    };
  }
}

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { component: Loader() };
    console.log(props);
  }

  componentDidMount() {
    AsyncSearch(this.props).then(component => this.setState({ component }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.href !== this.props.location.href) {
      this.setState({ component: Loader() });
      AsyncSearch(this.props).then(component => this.setState({ component }));
    }
  }

  render() {
    return this.state.component;
  }
}

export default withTranslation()(Search);
