import { Link } from 'components/Router';
import React from 'react';

import i18n from '../i18n';
import { flatMap, groupBy } from '../utils';

export default function TagCloud(props) {
  const { tags, isDefaultLang, lang } = props;
  i18n.changeLanguage(lang);
  const maxHits = tags.reduce((a, b) => Math.max(a, b.hits), tags[0].hits);
  const minHits = tags.reduce((a, b) => Math.min(a, b.hits), tags[0].hits);
  const diff = maxHits - minHits;
  const groups = 3;

  const tagGroups = groupBy(
    tags,
    tag => ((tag.hits - minHits) / diff) * groups
  );
  tagGroups.sort((a, b) => b[0] - a[0]);
  tagGroups.forEach(group => group[1].sort((a, b) => b.hits - a.hits));
  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: 0,
        textAlign: "right"
      }}
    >
      {flatMap(tagGroups, group => (
        <div key={`tag-group-${group[0]}`}>
          {group[1].map(tag => (
            <Link
              key={tag.value}
              to={
                isDefaultLang
                  ? `/${i18n.t("tags")}/${tag.value}/`
                  : `/${lang}/${i18n.t("tags")}/${tag.value}/`
              }
            >{`${tag.value}`}</Link>
          ))}
        </div>
      ))}
    </div>
  );
}
