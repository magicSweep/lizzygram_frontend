"use strict";
exports.__esModule = true;
exports.main = void 0;
var replacer_1 = require("../../../replacer");
var path_1 = require("path");
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
var pExpressUrlConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src", "config.portfolio.ts"),
    strPartToIdentify: "pExpressUrl",
    strStart: "export",
    strEnd: ";",
    variants: ['export const pExpressUrl = "https://localhost:3009"'],
    neededVariantIndex: 0
};
var lExpressUrlConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src", "config.lizzygram.ts"),
    strPartToIdentify: "lExpressUrl",
    strStart: "export",
    strEnd: ";",
    variants: ['export const lExpressUrl = "https://localhost:3009"'],
    neededVariantIndex: 0
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
var main = function () {
    var promises = [
        //numberOfPhotosPerQueryConfig,
        pExpressUrlConfig,
        lExpressUrlConfig,
        //bundleAnalyzerConfig,
    ].map(replacer_1.replacer);
    return Promise.all(promises)["catch"](function (err) { return console.error(err); });
};
exports.main = main;
