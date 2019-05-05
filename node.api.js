import chalk from "chalk";
import fs from "fs-extra";
import nodePath from "path";

export default (options = {}) => ({
  afterExport: async state => {
    const {
      config: {
        paths: { DIST }
      },
      staging
    } = state;
    const filename = staging ? "sitemap.staging.xml" : "sitemap.xml";
    console.log(`Reading ${filename}...`);

    const path = nodePath.join(DIST, filename);
    const allLines = fs.readFileSync(path).toString();

    console.log(allLines);
    fs.writeFileSync(
      path,
      allLines
        .replace(
          "<urlset",
          '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"'
        )
        .split("></xhtml:link")
        .map(e =>
          e.indexOf("<urlset") > 0
            ? e
            : e
                .split(">")
                .slice(1)
                .join(">")
        )
        .join("/>"),
      () => {
        console.log("Updating the file");
      }
    );

    console.log(chalk.green(`[\u2713] ${filename} updated`));
  }
});
