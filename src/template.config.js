export default {
  siteRoot:
    process.env.NODE_ENV === "development"
      ? "https://localhost:3000"
      : "https://react-static-teapot.netlify.com",
  defaultLanguage: "en",
  ga: "UA-73928706-6"
};