import { Link } from "components/Router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Languages(props) {
  const { langRefs } = props;
  const { t } = useTranslation();
  langRefs.sort((a, b) => t(a.lang).localeCompare(t(b.lang)));

  return (
    <div className="langs">
      {langRefs &&
        langRefs.map(ref => (
          <span key={ref.lang} className="lang">
            <Link key={ref.lang} to={ref.url} disabled={ref.selected === true}>
              {t(ref.lang)}
            </Link>
          </span>
        ))}
    </div>
  );
}
