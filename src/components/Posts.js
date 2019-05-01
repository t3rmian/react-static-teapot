import { Link } from 'components/Router';
import React from 'react';
import { groupBy } from '../utils.js';
import { useTranslation } from 'react-i18next';

export default function Posts(props) {
  const { posts } = props;
  const { t } = useTranslation();
  const postsByMonth = groupBy(posts, post =>
    t("date=year+month", { date: new Date(post.fileInfo.modifiedAt) })
  );
  return (
    <table>
      {postsByMonth.map(monthAndPosts => [
        <thead key={monthAndPosts[0]}>
          <tr>
            <th className="date-head">{monthAndPosts[0]}</th>
          </tr>
        </thead>,
        <tbody key={monthAndPosts[0] + "-body"}>
          {monthAndPosts[1].map(post => (
            <tr key={post.title}>
              <td className="date-col">
                {t("date=month+day", {
                  date: new Date(post.fileInfo.modifiedAt)
                })}
              </td>
              <td>
                <Link to={post.path}>{post.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      ])}
    </table>
  );
}
