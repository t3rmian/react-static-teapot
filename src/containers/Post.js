import Footer from "../components/Footer";
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

    const script = document.createElement("script");
    const anchor = document.getElementById("comments");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin","anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "t3rmian/react-static-teapot");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute( "theme", "github-light");
    anchor.appendChild(script);
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
    <div className="container post-container">
      <div className="page">
        <SEOHead
          title={post.title + " - " + t("site title", { lng: lang })}
          description={post.contents}
          lang={lang}
          type="article"
          langRefs={langRefs}
          image={imageUrl}
          date={(post.updated
            ? new Date(post.updated)
            : new Date(post.date)
          ).toISOString()}
          twitterContentUsername={post.twitterAuthor}
          twitterCard="summary"
        />
        <header>
          <Link className="post-logo fadeIn" to={root}>
            <img src="/img/logo.png" alt="Logo" />
          </Link>
          <SearchBar root={root} lang={lang} />
        </header>
        <main>
          <article>
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
                  <time dateTime={new Date(post.date).toISOString()}>
                    {t("date=post", {
                      date: new Date(post.date),
                      lng: lang
                    })}
                  </time>
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
                          <time dateTime={new Date(post.updated).toISOString()}>
                            {t("date=post", {
                              date: new Date(post.updated),
                              lng: lang
                            })}
                          </time>
                        </td>
                      )}
                      {post.author && <td className="author">{post.author}</td>}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </article>
        </main>
        <TagCloud isDefaultLang={isDefaultLang} lang={lang} tags={tags} />
        <div id="comments"></div>
        <Footer langRefs={langRefs} />
        <SearchBar root={root} lang={lang}/>
      </div>
    </div>
  );
}

export default lifecycle(methods)(Post);
