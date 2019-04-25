import { Link } from "components/Router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteData } from "react-static";
import LangSwitcher from "../containers/LangSwitcher";
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
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map);
  }

  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <header style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/21/05/beverage-1296175_960_720.png"
          alt="react-static-teapot"
          style={{ width: "20vw" }}
        />
        <div
          style={{
            float: "left",
            verticalAlign: "bottom",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column"
          }}
        >
          <h1>It's blog time.</h1>
        </div>
      </header>
      <main>
        {t("Recent")}
        <table>
          {groupBy(posts, post =>
            t("date=year+month", { date: new Date(post.fileInfo.modifiedAt) })
          ).map(monthlyPosts => [
            <thead key={monthlyPosts[0]}>
              <tr>
                <th className="date-head">{monthlyPosts[0]}</th>
              </tr>
            </thead>,
            <tbody key={monthlyPosts[0] + "-body"}>
              {monthlyPosts[1].map(post => (
                <tr key={post.title}>
                  <td className="date-col">
                    {t("date=year+month+day", {
                      date: new Date(post.fileInfo.modifiedAt)
                    })}
                  </td>
                  <td>
                    <Link
                      to={
                        isDefault
                          ? `/posts/${post.id}/`
                          : `/${lang}/posts/${post.id}/`
                      }
                    >
                      {post.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ])}
        </table>
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
