"use strict";
exports.__esModule = true;
var replacer_1 = require("../service/replacer");
var path_1 = require("path");
////////////////////// CONFIG //////////////////
var numberOfPhotosPerQueryConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src", "config.ts"),
    strPartToIdentify: "numberOfPhotosPerQuery",
    strStart: "export",
    strEnd: ";",
    variants: [
        "export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery( photoCardWidth, photoCardHeight)",
    ],
    neededVariantIndex: 0
};
var pExpressUrlConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src", "config.portfolio.ts"),
    strPartToIdentify: "pExpressUrl",
    strStart: "export",
    strEnd: ";",
    variants: [
        'export const pExpressUrl = "https://photo-boom-worker.herokuapp.com"',
    ],
    neededVariantIndex: 0
};
var lExpressUrlConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src", "config.lizzygram.ts"),
    strPartToIdentify: "lExpressUrl",
    strStart: "export",
    strEnd: ";",
    variants: [
        'export const lExpressUrl = "https://lizzygram-worker.herokuapp.com"',
    ],
    neededVariantIndex: 0
};
// disable gatsby-plugin-webpack-bundle-analyser-v2
var bundleAnalyzerConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "gatsby-config.js"),
    strPartToIdentify: "gatsby-plugin-webpack-bundle-analyser-v2",
    strStart: '"',
    strEnd: ",",
    variants: ["//"],
    neededVariantIndex: 0
};
////////////////// EVAL //////////////////
var promises = [
    numberOfPhotosPerQueryConfig,
    pExpressUrlConfig,
    lExpressUrlConfig,
    bundleAnalyzerConfig,
].map(replacer_1.replacer);
Promise.all(promises)["catch"](function (err) { return console.error(err); });
