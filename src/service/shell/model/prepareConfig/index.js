"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.prepareConfigToDevelop = exports.prepareConfigToDeploy = void 0;
var deploy_1 = require("./deploy");
__createBinding(exports, deploy_1, "main", "prepareConfigToDeploy");
var develop_1 = require("./develop");
__createBinding(exports, develop_1, "main", "prepareConfigToDevelop");
