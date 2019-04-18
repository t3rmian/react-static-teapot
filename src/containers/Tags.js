import { Link } from 'components/Router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteData } from 'react-static';

export default () => {
  const { t, i18n } = useTranslation();
  let { posts, lang, isDefault } = useRouteData();
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
      <h1>It's blog time.</h1>
      <div>
        <a href="#bottom" id="top">
          {t("Scroll to bottom!")}
        </a>
      </div>
      <br />
      <pre>
        {JSON.stringify(
          groupBy(posts, post => post.fileInfo.createdAt.substring(0, 7)),
          null,
          "\t"
        )}
      </pre>
      {t('Recent')}
      {groupBy(posts, post =>
        t("date=year+month", { date: new Date(post.fileInfo.createdAt) })
      ).map(monthlyPosts => (
        <table key={monthlyPosts[0]}>
          <thead>
            <tr>
              <th>{monthlyPosts[0]}</th>
            </tr>
          </thead>
          {monthlyPosts[1].map(post => (
            <tbody key={post.id}>
              <tr>
                <td>
                  {t("date=year+month+day", {
                    date: new Date(post.fileInfo.createdAt)
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
            </tbody>
          ))}
        </table>
      ))}
      <a onClick={() => setExpanded(true)}>{t("More")}</a>
      <a href="#top" id="bottom">
        {t("Scroll to top!")}
      </a>
    </div>
  );
}
