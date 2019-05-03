import Languages from "../components/Languages";
import React from "react";
import i18n from "../i18n";

const langs = Object.keys(i18n.services.resourceStore.data);

export default () => (
  <div className="loading">
    <h1>404</h1>
    <Languages
      langRefs={[
        ...langs
          .filter(lang => lang !== i18n.t("defaultLang"))
          .map(lang => ({
            lang,
            url: `/${lang}`
          })),
        {
          lang: i18n.t("defaultLang"),
          url: "/"
        }
      ]}
    />
  </div>
);
