import { Link } from "components/Router";
import React from "react";
import SEOHead from "../components/SEOHead";
import convert from "htmr";

export default props => {
  const { home, root, seo } = props;
  const logo = (seo.image = "/img/logo.png");

  return (
    <header className="header-container">
      <SEOHead {...seo} />
      <div className="header-row">
        <Link className="logo" to={root}>
          <img className="logo" src={logo} alt="react-static-teapot" />
        </Link>
        {home && (
          <div className="title-row">
            <div className="logo-title">
              <h1>{home.title}</h1>
            </div>
            {home && (
              <div className="logo-description">{convert(home.contents)}</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
