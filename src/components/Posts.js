import { Link } from "components/Router";
import React from "react";
import { groupBy } from "../utils.js";
import { useTranslation } from "react-i18next";

export default function Posts(props) {
  const { posts } = props;
  const { t } = useTranslation();
  const postsByMonth = groupBy(posts, post =>
    t("date=year+month", { date: new Date(post.date) })
  );
  return (
    <table>
      {postsByMonth.map(([month, posts]) => (
        <tbody key={month}>
          <tr>
            <th colSpan="2" className="date-head">
              <time
                dateTime={new Date(posts[0].date)
                  .toISOString()
                  .split("-")
                  .slice(0, 2)
                  .join("-")}
              >
                {month}
              </time>
            </th>
          </tr>
          {posts.map(post => (
            <tr key={post.title}>
              <td className="date-col">
                <time dateTime={new Date(post.date).toISOString()}>
                  {t("date=month+day", {
                    date: new Date(post.date)
                  })}
                </time>
              </td>
              <td>
                <Link to={post.path}>{post.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
