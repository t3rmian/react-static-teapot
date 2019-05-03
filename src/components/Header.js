import { Link } from "components/Router";
import React from "react";
import SEOHead from "../components/SEOHead";
import convert from "htmr";

export default props => {
  const { home, root, seo } = props;
  const logo = (seo.image =
    "https://cdn.pixabay.com/photo/2016/03/31/21/05/beverage-1296175_960_720.png");

  return (
    <header>
      <SEOHead {...seo} />
      <div className="header-row">
        <Link className="logo" to={root}>
          <img className="logo" src={logo} alt="react-static-teapot" />
        </Link>
        {home && (
          <div className="logo-title">
            <h1>{home.title}</h1>
          </div>
        )}
      </div>
      {home && convert(home.contents)}
    </header>
  );
};
