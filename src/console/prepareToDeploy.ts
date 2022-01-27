import { compose } from "fmagic";
import { replacer, ReplacerConfig } from "../service/replacer";
import { join } from "path";

////////////////////// CONFIG //////////////////

const isPortfolioBuild = process.env.BUILD_FOR === "portfolio";

const numberOfPhotosPerQueryConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.ts"),
  strPartToIdentify: "numberOfPhotosPerQuery",
  strStart: "export",
  strEnd: ";",
  variants: [
    "export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery( photoCardWidth, photoCardHeight)",
  ],
  neededVariantIndex: 0,
};

const expressUrlConfig = {
  pathToConfigFile:
    isPortfolioBuild === true
      ? join(process.cwd(), "src", "config.portfolio.ts")
      : join(process.cwd(), "src", "config.lizzygram.ts"),
  strPartToIdentify: isPortfolioBuild === true ? "pExpressUrl" : "lExpressUrl",
  strStart: "export",
  strEnd: ";",
  variants: [
    isPortfolioBuild === true
      ? 'export const pExpressUrl = "https://photo-album-worker.herokuapp.com"'
      : 'export const lExpressUrl = "https://lizzygram-worker.herokuapp.com"',
  ],
  neededVariantIndex: 0,
};

////////////////// EVAL //////////////////

const promises = [numberOfPhotosPerQueryConfig, expressUrlConfig].map(replacer);

Promise.all(promises).catch((err: any) => console.error(err));
