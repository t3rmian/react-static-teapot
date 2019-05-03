import Languages from "../components/Languages";
import { Link } from "components/Router";
import React from "react";
import SEOHead from "../components/SEOHead";
import SearchBar from "../components/SearchBar";
import TagCloud from "../components/TagCloud";
import convert from "htmr";
import lifecycle from "react-pure-lifecycle";
import { useRouteData } from "react-static";
import { useTranslation } from "react-i18next";

const methods = {
  componentDidMount() {
    const images = document.querySelectorAll(".content img[data-src]");

    const options = {
      rootMargin: "100px 0px",
      root: null
    };

    function onIntersection(images, observer) {
      images.forEach(image => {
        if (image.intersectionRatio > 0.001) {
          observer.unobserve(image.target);
          image.target.src = image.target.dataset.src;
        }
      });
    }

    const observer = new IntersectionObserver(onIntersection, options);
    images.forEach(image => observer.observe(image));
  }
};

export function Post() {
  const { post, isDefaultLang, lang, langRefs, tags, root } = useRouteData();
  const { t } = useTranslation();
  const minutesRead = Math.round(0.5 + post.contents.split(" ").length / 130);
  const hqImgRegex = /data-src=\"(.*?)\">/gi;
  const lazyImgRegex = /src=\"(.*?)\">/gi;
  const imageUrl =
    hqImgRegex.exec(post.contents) != null
      ? RegExp.$1
      : lazyImgRegex.exec(post.contents) != null
      ? RegExp.$1
      : null;

  return (
    <div className="post-container">
      <div className="page">
        <SEOHead
          title={post.title + " - " + t("site title", { lng: lang })}
          description={post.contents}
          lang={lang}
          type="article"
          langRefs={langRefs}
          image={imageUrl}
          twitterContentUsername={post.twitterAuthor}
          twitterCard="summary"
        />
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
                date: new Date(post.date),
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
          {(post.updated || post.author) && (
            <table className="more">
              <tbody>
                <tr>
                  {post.updated && (
                    <td className="updated">
                      {t("Updated", { lng: lang }) + ": "}
                      {t("date=post", {
                        date: new Date(post.updated),
                        lng: lang
                      })}
                    </td>
                  )}
                  {post.author && <td className="author">{post.author}</td>}
                </tr>
              </tbody>
            </table>
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

export default lifecycle(methods)(Post);
