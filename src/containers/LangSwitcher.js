import { Link } from 'components/Router';
import React from 'react';

export default function LangSwitcher(props) {
  const { langRefs } = props;

  return (
    <ul>
      {langRefs && langRefs.map(ref => (
        <li key={ref.lang}>
          <Link key={ref.lang} to={ref.url}>
            {ref.lang}
          </Link>
        </li>
      ))}
    </ul>
  );
}
