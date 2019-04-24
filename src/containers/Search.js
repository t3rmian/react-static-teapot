import { asyncReactor } from 'async-reactor';
import React from 'react';
import { prefetch } from 'react-static';
import TagCloud from "../containers/TagCloud";

function Loader() {
  return <b>Loading ...</b>;
}

async function Search(props) {
  const count = (text, substring) => {
    var m = text.match(
      new RegExp(
        substring.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"),
        "g"
      )
    );
    return m ? m.length : 0;
  };
  const path = props.location.pathname;
  let { posts, lang, isDefault } = await prefetch(props.lang == null ? '/' : '/' + props.lang);
  const query = decodeURIComponent(props.location.href.split(path)[1])
    .replace(/[.,]/g, " ")
    .replace(/\s\s+/g, " ")
    .replace(/\?q=/g, " ");
  const words = query.split(" ").filter(Boolean);
  const matchingPosts = posts
    .map(post => {
      const titleHits = words
        .map(word => count(post.title, word))
        .reduce((a, b) => a + b, 0);
      const tagHits = words
        .map(word => (post.tags != null ? count(post.tags.join(" "), word) : 0))
        .reduce((a, b) => a + b, 0);
      const contentHits = words
        .map(word => count(post.contents, word))
        .reduce((a, b) => a + b, 0);
      return {
        ...post,
        titleHits,
        tagHits,
        contentHits,
        score: Math.pow(titleHits, 3) + Math.pow(tagHits, 2) + contentHits
      };
    })
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score);

  let header;
  if (words.length > 0) {
    header = (
      <div>
        Search results for any of the following query parts:
        {" " + words.map(word => '"' + word + '"').join(", ")}
      </div>
    );
  } else {
    header = <div>Oops, empty query...</div>;
  }

  let content;
  if (matchingPosts.length > 0) {
    content = (
      <div>
        {matchingPosts.map(post => (
          <div key={post.title}>
            <div>
              {post.fileInfo.createdAt} {post.title}
            </div>
            <div>
              Score: {post.score}, title hits: {post.titleHits}, tag hits:{" "}
              {post.tagHits}, content hits: {post.contentHits}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div>
        Oh snap! We don't have such content yet. But come back later. Maybe we
        will write about it.
      </div>
    );
  }
  return (
    <div>
      {header}
      {content}
      <TagCloud isDefault={isDefault} lang={lang} tags={[{value: "tag1", "hits": 2}, {value: "tag2", "hits": 2}, {value: "tag3", "hits": 1},  {value: "tag4", "hits": 10}]}/>
    </div>
  );
}

export default asyncReactor(Search, Loader);
