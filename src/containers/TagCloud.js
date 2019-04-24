import { Link } from 'components/Router';
import React from 'react';

export default function TagCloud(props) {
  const { tags, isDefault, lang } = props;
  const concat = (x, y) => x.concat(y);
  const flatMap = (xs, f) => xs.map(f).reduce(concat, []);
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
    <div style={{position: 'absolute', top: '50px', right: 0, textAlign: 'right'}}>
      {flatMap(
        tagGroups,
        group =>
          <div key={`tag-group-${group[0]}`}>
          {group[1].map(tag => (
            <Link
              key={tag.value}
              to={isDefault ? `/tags/${tag.value}/` : `/${lang}/tags/${tag.value}/`}
            >{`${tag.value}`}</Link>
          ))}
          </div>
      )}
    </div>
  );
}
