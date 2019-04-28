import './app.scss';

import { Head, Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router } from 'components/Router';

import Dynamic from 'containers/Dynamic';
import React from 'react';
import Search from 'containers/Search';
import i18n from './i18n';

const langs = Object.keys(i18n.services.resourceStore.data);
addPrefetchExcludes([
  "dynamic",
  `${i18n.t("search", { lng: i18n.t("defaultLang") })}`,
  ...langs.map(lang => `:lang/${i18n.t("search", { lng: lang })}`)
]);

function App() {
  return (
    <Root>
      <Head>
        <title>react-static-teapot</title>
        <meta name="robots" content="noindex" />
      </Head>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/search">Search</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav>
      <div className="page-content">
        <React.Suspense fallback={<div className="loading"><em>Loading...</em></div>}>
          <Router>
            <Dynamic path="dynamic" />
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

export default App;
