import { Head } from "react-static";
import React from "react";
import { useSiteData } from "react-static";
import { useTranslation } from "react-i18next";

function extractHtmlText(htmlText) {
  const div = document.createElement("div");
  div.innerHTML = htmlText;
  return div.textContent || div.innerText || "";
}

export default props => {
  const extractedDescription = extractHtmlText(props.description);
  const description =
    extractedDescription.length > 160
      ? extractedDescription.substring(0, 159) + "…"
      : extractedDescription;
  const { siteRoot } = useSiteData();
  const {
    title,
    lang,
    type,
    image,
    langRefs,
    twitterContentUsername,
    twitterCard
  } = props;
  const { t } = useTranslation();
  const siteName = t("site title", { lng: lang });
  const twitterSiteUsername = t("twitter author", { lng: lang });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" property="description" content={description} />
      {type && <meta property="og:type" content={type} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={siteRoot + image} />}
      <meta
        property="og:url"
        content={siteRoot + langRefs.find(ref => ref.selected).url}
      />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={siteRoot + image} />}
      {twitterSiteUsername && (
        <meta name="twitter:site" content={`@${twitterSiteUsername}`} />
      )}
      {twitterContentUsername && (
        <meta name="twitter:creator" content={`@${twitterContentUsername}`} />
      )}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
    </Head>
  );
};
