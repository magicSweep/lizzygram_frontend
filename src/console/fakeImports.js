"use strict";
exports.__esModule = true;
var fmagic_1 = require("fmagic");
var replacer_1 = require("../service/replacer");
var path_1 = require("path");
/////////////// ARGS ///////////////////////
var args = process.argv.slice(2);
var getArgs = (0, fmagic_1.compose)(function (args) { return args[0]; }, function (argPair) { return argPair.split("="); }, function (argPair) {
    var _a;
    return (_a = {},
        _a[argPair[0]] = argPair[1] === "true" ? true : false,
        _a);
});
var isFake = getArgs(args).isFake;
//console.log("IS FAKE", isFake);
/////////////////// CONFIG //////////////////////
var strStart = '"';
var strEnd = ";";
var neededVariantIndex = isFake === true ? 1 : 0;
// "../repository/firestore"
var photosDbServiceConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src/photos/service/DbService.ts"),
    strPartToIdentify: "repository/firestore",
    strStart: strStart,
    strEnd: strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex: neededVariantIndex
};
// "../api/worker"
var photosWorkerServiceConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src/photos/service/WorkerService.ts"),
    strPartToIdentify: "api/worker",
    strStart: strStart,
    strEnd: strEnd,
    variants: ['"../api/worker"', '"../api/worker.fake"'],
    neededVariantIndex: neededVariantIndex
};
var authServiceConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src/auth/service/AuthService.ts"),
    strPartToIdentify: "firebase/firebase.auth",
    strStart: strStart,
    strEnd: strEnd,
    variants: [
        '"./../../firebase/firebase.auth"',
        '"./../../firebase/firebase.auth.fake"',
    ],
    neededVariantIndex: neededVariantIndex
};
//import { isUserExists } from "../repository/firestore";
var authDbServiceConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src/auth/service/DbService.ts"),
    strPartToIdentify: "repository/firestore",
    strStart: strStart,
    strEnd: strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex: neededVariantIndex
};
var tagsServiceConfig = {
    pathToConfigFile: (0, path_1.join)(process.cwd(), "src/tags/service/index.ts"),
    strPartToIdentify: "repository/firestore",
    strStart: strStart,
    strEnd: strEnd,
    variants: ['"../repository/firestore"', '"../repository/firestore.fake"'],
    neededVariantIndex: neededVariantIndex
};
////////////////// EVAL //////////////////
var promises = [
    photosDbServiceConfig,
    photosWorkerServiceConfig,
    authServiceConfig,
    authDbServiceConfig,
    tagsServiceConfig,
].map(replacer_1.replacer);
Promise.all(promises)["catch"](function (err) { return console.error(err); });
