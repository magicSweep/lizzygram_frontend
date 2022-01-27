"use strict";
exports.__esModule = true;
var replacer_1 = require("../service/replacer");
var path_1 = require("path");
////////////////////// CONFIG //////////////////
var isPortfolioBuild = process.env.BUILD_FOR === "portfolio";
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
var expressUrlConfig = {
    pathToConfigFile: isPortfolioBuild === true
        ? (0, path_1.join)(process.cwd(), "src", "config.portfolio.ts")
        : (0, path_1.join)(process.cwd(), "src", "config.lizzygram.ts"),
    strPartToIdentify: isPortfolioBuild === true ? "pExpressUrl" : "lExpressUrl",
    strStart: "export",
    strEnd: ";",
    variants: [
        isPortfolioBuild === true
            ? 'export const pExpressUrl = "https://photo-album-worker.herokuapp.com"'
            : 'export const lExpressUrl = "https://lizzygram-worker.herokuapp.com"',
    ],
    neededVariantIndex: 0
};
////////////////// EVAL //////////////////
var promises = [numberOfPhotosPerQueryConfig, expressUrlConfig].map(replacer_1.replacer);
Promise.all(promises)["catch"](function (err) { return console.error(err); });
