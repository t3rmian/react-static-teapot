import { Head } from "react-static";
import { Link } from "components/Router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Languages({ langRefs }) {
  const { t } = useTranslation();
  langRefs.sort((a, b) => t(a.lang).localeCompare(t(b.lang)));

  return (
    <div className="langs">
      {langRefs.map(ref => (
        <span key={ref.lang} className="lang">
          <Link
            key={ref.lang}
            to={ref.url}
            disabled={ref.selected === true}
            hrefLang={ref.lang}
          >
            {t(ref.lang)}
          </Link>
        </span>
      ))}
      <Head
        link={[
          ...langRefs.map(ref => ({
            rel: "alternate",
            hreflang: ref.lang,
            href: ref.url
          })),
          ...langRefs
            .filter(ref => ref.lang === t("defaultLang"))
            .map(ref => ({
              rel: "alternate",
              hreflang: "x-default",
              href: ref.url
            }))
        ]}
      />
    </div>
  );
}
