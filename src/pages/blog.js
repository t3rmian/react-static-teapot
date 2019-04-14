import { Link } from 'components/Router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteData } from 'react-static';

export default function Blog() {
  const { t, i18n } = useTranslation();
  let { posts, lang, isDefault } = useRouteData();
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
          Scroll to bottom!
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
      Recent Posts:
      {groupBy(posts, post => post.fileInfo.createdAt.substring(0, 7)).map(
        monthlyPosts => (
          <table key={monthlyPosts[0]}>
            <thead>
              <tr>
                <th>{monthlyPosts[0]}</th>
              </tr>
            </thead>
            {monthlyPosts[1].map(post => (
              <tbody key={post.id}>
                <tr>
                  <td>{post.fileInfo.createdAt}</td>
                  <td>
                    <Link
                      to={
                        isDefault
                          ? `/blog/post/${post.id}/`
                          : `/${lang}/blog/post/${post.id}/`
                      }
                    >
                      {post.title}
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )
      )}
      <a onClick={() => setExpanded(true)}>Read more</a>
      <a href="#top" id="bottom">
        Scroll to top!
      </a>
    </div>
  );
}
