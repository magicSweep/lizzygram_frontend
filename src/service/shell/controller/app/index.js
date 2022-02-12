"use strict";
exports.__esModule = true;
exports.main = void 0;
var args_1 = require("../../service/args");
var fmagic_1 = require("fmagic");
var fakeImports_1 = require("../../model/fakeImports");
var prepareConfig_1 = require("../../model/prepareConfig");
exports.main = (0, fmagic_1.compose)(function () { return (0, args_1.parse)()[0]; }, (0, fmagic_1.tap)(function (variant) { return console.log("---------ARGS", variant); }), (0, fmagic_1.cond)([
    [
        function (variant) { return variant === "-fake-imports"; },
        function () { return (0, fakeImports_1.main)(true); },
    ],
    [
        function (variant) { return variant === "-real-imports"; },
        function () { return (0, fakeImports_1.main)(false); },
    ],
    [
        function (variant) { return variant === "-prepare-to-deploy"; },
        function () {
            (0, fakeImports_1.main)(false);
            (0, prepareConfig_1.main)();
        },
    ],
    [
        function () { return true; },
        function (variant) {
            throw new Error("Unknown variant ".concat(variant));
        },
    ],
]));
