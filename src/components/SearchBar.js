import React from "react";
import { useTranslation } from "react-i18next";

export default props => {
  const { t } = useTranslation();

  return (
    <div className="search-bar-container">
      <form
        action={props.root + t("search", { lng: props.lang })}
        className="search-bar"
      >
        <input type="search" name="q" />
        <button>⌕</button>
      </form>
    </div>
  );
};
