import Languages from "../components/Languages";
import { Link } from "components/Router";
import React from "react";
import SearchBar from "../components/SearchBar";
import TagCloud from "../components/TagCloud";
import convert from "htmr";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

export default function Post() {
  const { post, isDefaultLang, lang, langRefs, tags, root } = useRouteData();
  const { t } = useTranslation();
  const minutesRead = Math.round(0.5 + post.contents.split(" ").length / 130);
  return (
    <div className="post-container">
      <div className="page">
        <SearchBar root={root} lang={lang} />
        <Link to={root}>{"<"}</Link>
        <br />
        <div className="header">
          <h2 className="title">{post.title}</h2>
          {post.tags && (
            <div className="tags">
              {post.tags.map(tag => (
                <Link
                  className="item"
                  key={tag}
                  to={`${tags.find(t => t.value === tag).path}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <div className="meta">
            <span className="item">
              {t("date=post", {
                date: new Date(post.fileInfo.modifiedAt),
                lng: lang
              })}
            </span>
            {post.source && (
              <span className="item">
                <Link to={post.source}>{t("source", { lng: lang })}</Link>
              </span>
            )}
            <span className="item">
              {t("count minutes read", {
                count: minutesRead,
                lng: lang
              })}
            </span>
          </div>
        </div>
        <div className="content">
          {convert(post.contents)}
          {post.author && (
            <div className="more">
              <span className="author">{post.author}</span>
            </div>
          )}
        </div>
        <div className="footer">
          <Languages langRefs={langRefs} />
        </div>
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
      </div>
    </div>
  );
}
