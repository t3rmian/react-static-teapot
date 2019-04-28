import convert from "htmr";
import React from "react";

export default props => {
  const { home } = props;

  return (
    <header>
      <div className="header-row">
        <img
          className="logo"
          src="https://cdn.pixabay.com/photo/2016/03/31/21/05/beverage-1296175_960_720.png"
          alt="react-static-teapot"
        />
        <div className="logo-title">
          <h1>{home.title}</h1>
        </div>
      </div>
      {convert(home.contents)}
    </header>
  );
};
