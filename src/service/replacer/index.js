"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.replacer = exports.replacer_ = void 0;
var fs_1 = require("fs");
var util_1 = require("util");
var fmagic_1 = require("fmagic");
// numberOfPhotosPerQuery from number to calcPhotosLimitPerQuery
var replacer_ = function (existsSync_, promisify_, readFile_, writeFile_) {
    return (0, fmagic_1.compose)(function (config) {
        return existsSync_(config.pathToConfigFile) === false
            ? fmagic_1.Done.of("File does not exists | ".concat(config.pathToConfigFile))
            : fmagic_1.NI_Next.of(config);
    }, 
    // GET CONTENT FROM FILE
    (0, fmagic_1.chain)((0, fmagic_1.compose)(function (config) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [__assign({}, config)];
                    _b = {};
                    return [4 /*yield*/, promisify_(readFile_)(config.pathToConfigFile, {
                            encoding: "utf-8"
                        })];
                case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.content = _c.sent(), _b)])))];
            }
        });
    }); }, (0, fmagic_1.then)(fmagic_1.NI_Next.of), (0, fmagic_1._catch)(function (err) {
        return fmagic_1.Done.of({
            err: err
        });
    }))), 
    // Get full string with
    (0, fmagic_1.then)((0, fmagic_1.map)(function (data) {
        var chunkIndex = data.content.indexOf(data.strPartToIdentify);
        var startIndex = data.content.lastIndexOf(data.strStart, chunkIndex);
        var endIndex = data.content.indexOf(data.strEnd, chunkIndex);
        data.fullSearchedString = data.content.substring(startIndex, endIndex);
        return data;
    })), 
    // Analyze if need to do anything
    (0, fmagic_1.then)((0, fmagic_1.chain)(function (data) {
        var isNeedChanges = data.fullSearchedString.replace(/\s+/g, "") !==
            data.variants[data.neededVariantIndex].replace(/\s+/g, "");
        return isNeedChanges === true
            ? fmagic_1.NI_Next.of(data)
            : fmagic_1.Done.of("No need to change...");
    })), 
    // Replace string
    (0, fmagic_1.then)((0, fmagic_1.map)(function (data) { return (__assign(__assign({}, data), { newContent: data.content.replace(data.fullSearchedString, data.variants[data.neededVariantIndex]) })); })), (0, fmagic_1.then)((0, fmagic_1.map)(function (data) {
        return promisify_(writeFile_)(data.pathToConfigFile, data.newContent, {
            encoding: "utf-8"
        });
    }
    /* tap((props: SwitchImportProps) =>
    //console.log("SAVE", props.pathToFile, props.content)
    
  ) */
    )), (0, fmagic_1.thenDoneFlat)((0, fmagic_1.fold)(function (res) { return console.error(res); }, function (res) { })));
};
exports.replacer_ = replacer_;
exports.replacer = (0, exports.replacer_)(fs_1.existsSync, util_1.promisify, fs_1.readFile, fs_1.writeFile);
