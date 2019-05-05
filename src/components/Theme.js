import Cookies from "universal-cookie";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Theme() {
  const { t } = useTranslation();
  const switchTheme = () => {
    const themeManager = document.getElementById("theme");
    themeManager.classList.toggle("theme-light");
    themeManager.classList.toggle("theme-dark");
    const theme = [].slice
      .call(themeManager.classList)
      .filter(c => c.indexOf("theme-") >= 0)[0];
    const cookies = new Cookies();
    cookies.set("theme", theme);
  };

  return (
    <div className="theme-switcher">
      <button onClick={() => switchTheme()}>
        <span role="img" aria-label={t("Light theme")}>
          ⚪
        </span>
        <span style={{ color: "white" }}>🢀</span>
        <span style={{ color: "black" }}>🢂</span>
        <span role="img" aria-label={t("Dark theme")}>
          ⚫
        </span>
      </button>
    </div>
  );
}

export const loadTheme = () => {
  console.log("Loading theme... ");

  if (typeof document !== "undefined") {
    const cookies = new Cookies();
    if (cookies.get("theme")) {
      const theme = cookies.get("theme");
      const themeManager = document.getElementById("theme");
      if (!themeManager.classList.contains(theme)) {
        [].slice
          .call(themeManager.classList)
          .filter(c => c.indexOf("theme-") >= 0)
          .forEach(c => themeManager.classList.remove(c));
        themeManager.classList.add(theme);
        console.log("Reset theme to " + theme);
      }
    }
  }
};
