import "./app.scss";

import { Head, Root, Routes } from "react-static";

import Loader from "./components/Loader";
import React from "react";
import { Router } from "components/Router";
import lifecycle from "react-pure-lifecycle";
import { loadTheme } from "components/Theme";

const methods = {
  componentDidMount() {
    loadTheme();
  }
};

function App() {
  return (
    <Root>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <div id="theme" className="theme-light">
        <React.Suspense fallback={Loader()}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default lifecycle(methods)(App);
