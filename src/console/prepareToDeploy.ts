import { compose } from "fmagic";
import { replacer, ReplacerConfig } from "../service/replacer";
import { join } from "path";

////////////////////// CONFIG //////////////////

const numberOfPhotosPerQueryConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.ts"),
  strPartToIdentify: "numberOfPhotosPerQuery",
  strStart: "export",
  strEnd: ";",
  variants: [
    "export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery( photoCardWidth, photoCardHeight)",
  ],
  neededVariantIndex: 0,
};

const pExpressUrlConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.portfolio.ts"),
  strPartToIdentify: "pExpressUrl",
  strStart: "export",
  strEnd: ";",
  variants: [
    'export const pExpressUrl = "https://photo-boom-worker.herokuapp.com"',
  ],
  neededVariantIndex: 0,
};

const lExpressUrlConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.lizzygram.ts"),
  strPartToIdentify: "lExpressUrl",
  strStart: "export",
  strEnd: ";",
  variants: [
    'export const lExpressUrl = "https://lizzygram-worker.herokuapp.com"',
  ],
  neededVariantIndex: 0,
};

// disable gatsby-plugin-webpack-bundle-analyser-v2
const bundleAnalyzerConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "gatsby-config.js"),
  strPartToIdentify: "gatsby-plugin-webpack-bundle-analyser-v2",
  strStart: '"',
  strEnd: ",",
  variants: ["//"],
  neededVariantIndex: 0,
};

////////////////// EVAL //////////////////

const promises = [
  numberOfPhotosPerQueryConfig,
  pExpressUrlConfig,
  lExpressUrlConfig,
  bundleAnalyzerConfig,
].map(replacer);

Promise.all(promises).catch((err: any) => console.error(err));
