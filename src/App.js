import "./app.scss";

import { Root, Routes, addPrefetchExcludes } from "react-static";

import Loader from "./components/Loader";
import React from "react";
import { Router } from "components/Router";
import Search from "containers/Search";
import i18n from "./i18n";
import lifecycle from "react-pure-lifecycle";
import { loadTheme } from "components/Theme";

const langs = Object.keys(i18n.services.resourceStore.data);
addPrefetchExcludes([
  `${i18n.t("search", { lng: i18n.t("defaultLang") })}`,
  ...langs
    .filter(lang => lang !== i18n.t("defaultLang"))
    .map(lang => `:lang/${i18n.t("search", { lng: lang })}`),
  ...langs
    .filter(lang => lang !== i18n.t("defaultLang"))
    .map(lang => `${lang}/${i18n.t("search", { lng: lang })}`)
]);


const methods = {
  componentDidMount() {
    loadTheme();
  }
};

function App() {
  return (
    <Root onLoad={() => loadTheme()}>
      <div id="theme" className="theme-light">
        <React.Suspense fallback={Loader()}>
          <Router>
            <Search
              path={`${i18n.t("search", { lng: i18n.t("defaultLang") })}`}
            />
            {langs.map(lang => (
              <Search
                key={lang}
                path={`:lang/${i18n.t("search", { lng: lang })}`}
              />
            ))}
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default lifecycle(methods)(App);
