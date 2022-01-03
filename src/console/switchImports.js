"use strict";
exports.__esModule = true;
var switchImport_1 = require("../service/switchImports/switchImport");
var switchImports_1 = require("../service/switchImports");
var fmagic_1 = require("fmagic");
//npm run create:func -- Render component/Render
var args = process.argv.slice(2);
var getArgs = (0, fmagic_1.compose)(function (args) { return args[0]; }, function (argPair) { return argPair.split("="); }, function (argPair) {
    var _a;
    return (_a = {},
        _a[argPair[0]] = argPair[1] === "true" ? true : false,
        _a);
});
var isFake = getArgs(args).isFake;
console.log("IS FAKE", isFake);
switchImports_1.tagsServiceImports.isFake = isFake;
switchImports_1.photoDbImports.isFake = isFake;
switchImports_1.photoWorkerImports.isFake = isFake;
switchImports_1.authDbServiceImports.isFake = isFake;
switchImports_1.authServiceImports.isFake = isFake;
[
    switchImports_1.tagsServiceImports,
    switchImports_1.photoDbImports,
    switchImports_1.photoWorkerImports,
    switchImports_1.authDbServiceImports,
    switchImports_1.authServiceImports,
].map(switchImport_1.switchImport);
