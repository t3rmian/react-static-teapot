import React from "react";
import { navigate } from "components/Router";
import { useTranslation } from "react-i18next";

export default props => {
  const { t } = useTranslation();
  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const query =
      "?" +
      Array.from(new FormData(form), p =>
        p.map(encodeURIComponent).join("=")
      ).join("&");
    if (query !== "?q=") {
      navigate(form.action + query);
    }
  };

  return (
    <div className="search-bar-container">
      <form
        onSubmit={e => onSubmit(e)}
        action={props.root + t("search", { lng: props.lang })}
        className="search-bar"
      >
        <input type="search" name="q" />
        <button>⌕</button>
      </form>
    </div>
  );
};
