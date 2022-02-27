import { replacer, ReplacerConfig } from "../../../replacer";
import { join } from "path";

////////////////////// CONFIG //////////////////

/* const numberOfPhotosPerQueryConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.ts"),
  strPartToIdentify: "numberOfPhotosPerQuery",
  strStart: "export",
  strEnd: ";",
  variants: [
    "export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery( photoCardWidth, photoCardHeight)",
  ],
  neededVariantIndex: 0,
}; */

const pExpressUrlConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.portfolio.ts"),
  strPartToIdentify: "pExpressUrl",
  strStart: "export",
  strEnd: ";",
  variants: ['export const pExpressUrl = "https://localhost:3009"'],
  neededVariantIndex: 0,
};

const lExpressUrlConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "src", "config.lizzygram.ts"),
  strPartToIdentify: "lExpressUrl",
  strStart: "export",
  strEnd: ";",
  variants: ['export const lExpressUrl = "https://localhost:3009"'],
  neededVariantIndex: 0,
};

// enable gatsby-plugin-webpack-bundle-analyser-v2
/* const bundleAnalyzerConfig: ReplacerConfig = {
  pathToConfigFile: join(process.cwd(), "gatsby-config.js"),
  strPartToIdentify: "plugin-webpack-bundle",
  strStart: "\n",
  strEnd: "\n",
  variants: [
    '//"gatsby-plugin-webpack-bundle-analyser-v2",',
    '"gatsby-plugin-webpack-bundle-analyser-v2",',
  ],
  neededVariantIndex: 1,
  doesIncludeFirstSymbol: false,
}; */

////////////////// EVAL //////////////////

export const main = () => {
  const promises = [
    //numberOfPhotosPerQueryConfig,
    pExpressUrlConfig,
    lExpressUrlConfig,
    //bundleAnalyzerConfig,
  ].map(replacer);

  return Promise.all(promises).catch((err: any) => console.error(err));
};
