"use strict";
exports.__esModule = true;
exports.main = void 0;
var args_1 = require("../../service/args");
var fmagic_1 = require("fmagic");
exports.main = (0, fmagic_1.compose)(function () { return (0, args_1.parse)()[0]; }, (0, fmagic_1.tap)(function (variant) { return console.log("---------ARGS", variant); })
/* cond([
  [
    (variant: Variants) => variant === "-fake-imports",
    () => fakeImports(true),
  ],
  [
    (variant: Variants) => variant === "-real-imports",
    () => fakeImports(false),
  ],
  [
    (variant: Variants) => variant === "-prepare-to-deploy",
    () => {
      fakeImports(false);
      prepareConfig();
    },
  ],
  [
    () => true,
    (variant: Variants) => {
      throw new Error(`Unknown variant ${variant}`);
    },
  ],
]) */
);
