"use strict";
exports.__esModule = true;
exports.main = void 0;
var replacer_1 = require("../../../replacer");
var path_1 = require("path");
var main = function (isFake) {
    var strStart = '"';
    var strEnd = ";";
    var neededVariantIndex = isFake === true ? 1 : 0;
    // ./src/firebase/init
    // firebase init
    var firebaseInitConfig = {
        pathToConfigFile: (0, path_1.join)(process.cwd(), "gatsby-browser.js"),
        strPartToIdentify: "firebase/init",
        strStart: strStart,
        strEnd: strEnd,
        variants: ['"./src/firebase/init"', '"./src/firebase/init.fake"'],
        neededVariantIndex: neededVariantIndex
    };
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
    var authPermissionsConfig = {
        pathToConfigFile: (0, path_1.join)(process.cwd(), "src/auth/hook/usePermissions/index.ts"),
        strPartToIdentify: "repository/firestore",
        strStart: strStart,
        strEnd: strEnd,
        variants: [
            '"../../repository/firestore"',
            '"../../repository/firestore.fake"',
        ],
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
    var promises = [
        firebaseInitConfig,
        photosDbServiceConfig,
        photosWorkerServiceConfig,
        authPermissionsConfig,
        authServiceConfig,
        authDbServiceConfig,
        tagsServiceConfig,
    ].map(replacer_1.replacer);
    return Promise.all(promises)["catch"](function (err) { return console.error(err); });
};
exports.main = main;
