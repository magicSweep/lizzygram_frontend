"use strict";
exports.__esModule = true;
var fmagic_1 = require("fmagic");
var path_1 = require("path");
var createReactFunc_1 = require("../service/createReactFunc");
var pathToSrc = (0, path_1.join)(process.cwd(), "src");
//npm run create:func photos/component/Render
//const args: string[] = process.argv.slice(2);
var getFuncInfo_ = function (pathToSrc) {
    return (0, fmagic_1.compose)(function () { return process.argv.slice(2)[0]; }, function (arg) { return arg.split("/"); }, function (pathParts) { return ({
        name: pathParts.pop(),
        pathToDir: "".concat(pathToSrc, "/").concat(pathParts.join("/"))
    }); });
};
var getFuncInfo = getFuncInfo_(pathToSrc);
//console.log("FUNC INFO", getFuncInfo());
(0, createReactFunc_1.createFunc)(getFuncInfo());
