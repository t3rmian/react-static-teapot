import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteData } from 'react-static';

export default () => {
  const { home } = useRouteData();
  const { t, i18n } = useTranslation();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to React-Static {home.id}</h1>
      <h1>{t("Welcome to React")}</h1>
    </div>
  );
};
