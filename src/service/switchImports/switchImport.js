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
exports.switchImport = exports.switchImport_ = void 0;
var fs_1 = require("fs");
var util_1 = require("util");
var fmagic_1 = require("fmagic");
var switchImport_ = function (existsSync_, promisify_) {
    return (0, fmagic_1.compose)(function (props) {
        return existsSync_(props.pathToFile) === false
            ? fmagic_1.Done.of("File does not exists | ".concat(props.pathToFile))
            : fmagic_1.NI_Next.of(props);
    }, (0, fmagic_1.map)((0, fmagic_1.tap)(function (props) { return console.log("MAKE FAKE IMPORT", props); })), 
    // MAKE FAKE IMPORT AND REMOVE WHITESPACES FROM IMPORTS
    (0, fmagic_1.map)(function (props) { return (__assign(__assign({}, props), { imports: __assign(__assign({}, props.imports), { fake: props.imports.truly.replace('";', '.fake";') /* .replace(/\s+/g, "") */ }) })); }), (0, fmagic_1.map)((0, fmagic_1.tap)(function (props) {
        return console.log("GET CONTENT FROM FILE", props);
    })), 
    // GET CONTENT FROM FILE AND REMOVE WHITESPACES
    (0, fmagic_1.chain)((0, fmagic_1.compose)(function (props) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [__assign({}, props)];
                    _b = {};
                    return [4 /*yield*/, promisify_(fs_1.readFile)(props.pathToFile, {
                            encoding: "utf-8"
                        })]; /* .replace(/\s+/g, ""), */
                case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.content = _c.sent() /* .replace(/\s+/g, ""), */, _b)])))];
            }
        });
    }); }, (0, fmagic_1.then)(fmagic_1.NI_Next.of), (0, fmagic_1._catch)(function (err) {
        return fmagic_1.Done.of({
            err: err
        });
    }))), (0, fmagic_1.then)((0, fmagic_1.map)(function (props) { return (__assign(__assign({}, props), { indexes: {
            truly: props.content.indexOf(props.imports.truly),
            fake: props.content.indexOf(props.imports.fake)
        } })); })), (0, fmagic_1.then)((0, fmagic_1.map)(function (props) {
        return (0, fmagic_1.cond)([
            // already import fake
            [
                function (_a) {
                    var indexes = _a.indexes, isFake = _a.isFake;
                    return isFake === true && indexes.fake !== -1;
                },
                fmagic_1.justReturn,
            ],
            [
                function (_a) {
                    var indexes = _a.indexes, isFake = _a.isFake;
                    return isFake === true && indexes.fake === -1;
                },
                function (props) { return (__assign(__assign({}, props), { content: props.content.replace(props.imports.truly, props.imports.fake) })); },
            ],
            [
                function (_a) {
                    var indexes = _a.indexes, isFake = _a.isFake;
                    return isFake === false && indexes.fake === -1;
                },
                fmagic_1.justReturn,
            ],
            [
                function (_a) {
                    var indexes = _a.indexes, isFake = _a.isFake;
                    return isFake === false && indexes.fake !== -1;
                },
                function (props) { return (__assign(__assign({}, props), { content: props.content.replace(props.imports.fake, props.imports.truly) })); },
            ],
            [
                function () { return true; },
                function (props) {
                    return fmagic_1.Done.of("Bad indexes | ".concat(props.isFake, " | ").concat(JSON.stringify(props.indexes)));
                },
            ],
        ])(props);
    })), 
    /*  then(
      map(tap((props: SwitchImportProps) => console.log("--------LOG", props)))
    ), */
    (0, fmagic_1.then)((0, fmagic_1.map)(function (props) {
        return promisify_(fs_1.writeFile)(props.pathToFile, props.content, {
            encoding: "utf-8"
        });
    }
    /* tap((props: SwitchImportProps) =>
    //console.log("SAVE", props.pathToFile, props.content)
    
  ) */
    )), (0, fmagic_1.thenDoneFlat)((0, fmagic_1.fold)(function (res) { return console.error(res); }, function (res) { })));
};
exports.switchImport_ = switchImport_;
exports.switchImport = (0, exports.switchImport_)(fs_1.existsSync, util_1.promisify);
/* import { existsSync, readFile, writeFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import {
  cond,
  compose,
  NI_Next,
  Done,
  map,
  then,
  chain,
  fold,
  thenDoneFlat,
  _catch,
  justReturn,
  tap,
} from "fmagic";

type Comments = "//" | "/*";

const makeCommentedString = (str: string, comment: Comments) =>
  cond<void, string>([
    [() => comment === "//", () => `//${str}`],
    [() => comment === "/*", () => `/*${str}/`],
  ])();

export type SwitchImportProps = {
  pathToFile: string;
  imports: {
    truly: string;
    trulyCommented: string;
    fake: string;
    fakeCommented: string;
  };
  comment: "//" | "/*";
  isFake: boolean;
  content: string;
  indexes: {
    truly: number;
    trulyCommented: number;
    fake: number;
    fakeCommented: number;
  };
};

export const switchImport_ = (
  existsSync_: typeof existsSync,
  promisify_: typeof promisify
) =>
  compose<SwitchImportProps, Promise<void>>(
    (props: SwitchImportProps) =>
      existsSync_(props.pathToFile) === false
        ? Done.of(`File does not exists | ${props.pathToFile}`)
        : NI_Next.of(props),
    chain(
      compose(
        async (props: SwitchImportProps) => ({
          ...props,
          content: (
            await promisify_(readFile)(props.pathToFile, {
              encoding: "utf-8",
            })
          ).replace(/\s+/g, ""),
        }),
        then(NI_Next.of),
        _catch((err: any) => {
          return Done.of({
            err,
          });
        })
      )
    ),

    then(
      map((props: SwitchImportProps) => ({
        ...props,
        imports: {
          truly: props.imports.truly.replace(/\s+/g, ""),
          trulyCommented: makeCommentedString(
            props.imports.truly,
            props.comment
          ).replace(/\s+/g, ""),
          fake: props.imports.fake.replace(/\s+/g, ""),
          fakeCommented: makeCommentedString(
            props.imports.fake,
            props.comment
          ).replace(/\s+/g, ""),
        },
      }))
    ),

    then(
      map((props: SwitchImportProps) => ({
        ...props,
        indexes: {
          truly: props.content.indexOf(props.imports.truly),
          trulyCommented: props.content.indexOf(props.imports.trulyCommented),
          fake: props.content.indexOf(props.imports.fake),
          fakeCommented: props.content.indexOf(props.imports.fakeCommented),
        },
      }))
    ),
    then(
      map((props: SwitchImportProps) =>
        cond([
          // already import fake
          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fakeCommented === -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === true && indexes.fakeCommented !== -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content
                .replace(props.imports.fakeCommented, props.imports.fake)
                .replace(props.imports.truly, props.imports.trulyCommented),
            }),
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.trulyCommented === -1,
            justReturn,
          ],

          [
            ({ indexes, isFake }: SwitchImportProps) =>
              isFake === false && indexes.trulyCommented !== -1,
            (props: SwitchImportProps) => ({
              ...props,
              content: props.content
                .replace(props.imports.trulyCommented, props.imports.truly)
                .replace(props.imports.fake, props.imports.fakeCommented),
            }),
          ],

          [
            () => true,
            (props: SwitchImportProps) =>
              Done.of(
                `Bad indexes | ${props.isFake} | ${JSON.stringify(
                  props.indexes
                )}`
              ),
          ],
        ])(props)
      )
    ),

    /* then(
      map(tap((props: SwitchImportProps) => console.log("--------LOG", props)))
    ), /

    then(
      map(
        (props: SwitchImportProps) =>
          promisify_(writeFile)(props.pathToFile, props.content, {
            encoding: "utf-8",
          })
        /* tap((props: SwitchImportProps) =>
        //console.log("SAVE", props.pathToFile, props.content)
        
      ) /
      )
    ),

    thenDoneFlat(
      fold(
        (res: any) => console.error(res),
        (res: any) => {}
      )
    )
  );

export const switchImport = switchImport_(existsSync, promisify);
 */
