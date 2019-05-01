import { Link } from "components/Router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TagCloud(props) {
  const { tags, lang } = props;
  const { t } = useTranslation();
  tags.sort((a, b) => b.hits - a.hits);
  
  return (
    <div className="tag-cloud">
      {t("Tag Cloud", { lng: lang })}
      <div key={`tag-group`}>
        {tags.map(tag => (
          <Link key={tag.value} to={tag.path}>{` ${tag.value}`}</Link>
        ))}
      </div>
    </div>
  );
}
