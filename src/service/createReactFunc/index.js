"use strict";
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
exports.createTestFile = exports.createStoriesFile = exports.createMainFile = exports.createDir = exports.createFunc = void 0;
var fmagic_1 = require("fmagic");
var fs_1 = require("fs");
var util_1 = require("util");
exports.createFunc = (0, fmagic_1.compose)(function (info) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.createDir)(info.pathToDir)];
            case 1:
                _a.sent();
                return [2 /*return*/, info];
        }
    });
}); }, (0, fmagic_1.then)(function (_a) {
    var pathToDir = _a.pathToDir, name = _a.name;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, exports.createMainFile)(name, pathToDir),
                        (0, exports.createStoriesFile)(name, pathToDir),
                        (0, exports.createTestFile)(name, pathToDir),
                    ])];
                case 1:
                    _b.sent();
                    return [2 /*return*/, { pathToDir: pathToDir, name: name }];
            }
        });
    });
}), (0, fmagic_1.then)(function (_a) {
    var pathToDir = _a.pathToDir, name = _a.name;
    return console.log("[SUCCESS CREATED] ".concat(pathToDir, "/").concat(name));
}), (0, fmagic_1._catch)(function (err) { return console.error(err); }));
var createDir = function (pathToDir) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((0, fs_1.existsSync)(pathToDir) === false)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, util_1.promisify)(fs_1.mkdir)(pathToDir)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.createDir = createDir;
var createMainFile = function (name, pathToDir) { return __awaiter(void 0, void 0, void 0, function () {
    var content, fileName;
    return __generator(this, function (_a) {
        content = "import React, {FC} from 'react';\n\nexport type ".concat(name, "Props = {}\n\nconst ").concat(name, ": FC<").concat(name, "Props> = ({}) => {\n\n  return (<></>);\n};\n\nexport default ").concat(name, ";\n        ");
        fileName = pathToDir + "/" + name + ".tsx";
        //console.log(fileName);
        //console.log(content);
        /* , (error: any) => {
            if (error) throw error; // если возникла ошибка
            console.log("Асинхронная запись main файла завершена. Содержимое файла:");
          } */
        return [2 /*return*/, (0, util_1.promisify)(fs_1.writeFile)(fileName, content)];
    });
}); };
exports.createMainFile = createMainFile;
var createStoriesFile = function (name, pathToDir) {
    var content = "import ".concat(name, ", {").concat(name, "Props} from \"./").concat(name, "\";\n        \nexport default {\n    component: ").concat(name, ",\n    title: \"Component/").concat(name, "\",\n};\n\nconst Template = (args: ").concat(name, "Props) => (<").concat(name, " {...args} />)\n\nexport const Default = Template.bind({});\n\nDefault.args = {}\n        ");
    var fileName = pathToDir + "/" + name + ".stories.tsx";
    //console.log(fileName);
    //console.log(content);
    /* , (error: any) => {
        if (error) throw error; // если возникла ошибка
        console.log(
          "Асинхронная запись stories файла завершена. Содержимое файла:"
        );
      } */
    return (0, util_1.promisify)(fs_1.writeFile)(fileName, content);
};
exports.createStoriesFile = createStoriesFile;
var createTestFile = function (name, pathToDir) {
    var content = "\nimport React from 'react';\nimport {\n  render,\n  fireEvent,\n  cleanup,\n  } from '@testing-library/react';\nimport { configure } from '@testing-library/dom';\nimport '@testing-library/jest-dom/extend-expect';\n\nimport ".concat(name, " from \"./").concat(name, "\";\n\ndescribe(\"").concat(name, "\", () => {\n\n  let _render = null;\n  \n  describe(\"Snapshots\", () => {\n  \n      beforeEach(() => {\n      \n          _render = render(<").concat(name, " />);\n      \n      });\n\n      afterEach(cleanup)\n  \n      test(\"matches snapshot\", () => {\n        const { baseElement } = _render;\n        expect(baseElement).toMatchSnapshot();\n      });\n  \n  });\n\n});\n      ");
    var fileName = pathToDir + "/" + name + ".test.tsx";
    //console.log(fileName);
    //console.log(content);
    /* , (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись тестогого файла завершена.");
    } */
    return (0, util_1.promisify)(fs_1.writeFile)(fileName, content);
};
exports.createTestFile = createTestFile;
/* const fs = require("fs");

const args: string[] = process.argv.slice(2);

//npm run create:func -- Render component/Render
class CreateReactFuncTS {
  mainDir: string = "./src/";
  funcName: string = "";
  funcFileName: string = "";
  dir: string = "";

  constructor(funcName: string, dir: string) {
    if (funcName && dir) {
      let funcFirstLetter = funcName[0];
      let funcOtherLetters = funcName.substring(1);

      //this.funcName = funcFirstLetter.toLowerCase() + funcOtherLetters;
      this.funcName = funcFirstLetter.toUpperCase() + funcOtherLetters;
      this.funcFileName = funcFirstLetter.toUpperCase() + funcOtherLetters;

      //TODO check if first char in dir equal "/"
      //TODO check if last char in dir equal "/"
      this.dir = this.mainDir + dir;

      this.create();
    } else {
      throw new Error("Empty funcName or dir...");
    }
  }

  create(): void {
    //create class name dir
    this.createDir();
    //create class file
    this.createClassFile();
    //create scss file
    //this.createScssFile();
    this.createSoriesFile();
    //create .test file
    this.createTestFile();
  }

  createDir(): void {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  createClassFile(): void {
    const content = `import React from 'react';
import classes from './${this.funcFileName}.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import { styled, makeStyles, Theme } from "@material-ui/core/styles";
//import { compose, sizing, positions } from "@material-ui/system";


interface I${this.funcFileName}Props  {
    
}

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: props => ({}),
  })
)/

const ${this.funcName} = ({}: ${this.funcFileName}Props) => {

  return (
        
        <div className={classes.root}></div>
            
    );
};

export default ${this.funcName};
        `;

    const fileName = this.dir + "/" + this.funcFileName + ".tsx";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись main файла завершена. Содержимое файла:");
    });
  }

  createSoriesFile(): void {
    const content = `import React from "react";
import ${this.funcFileName}, {I${this.funcFileName}Props} from "./${this.funcFileName}";
        
export default {
    component: ${this.funcFileName},
    title: "Component/${this.funcFileName}",
    decorators: [],
    //decorators: [ (story) => <div>{story()}</div> ],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const Template = (args: I${this.funcFileName}Props) => (<${this.funcFileName} {...args} />)

export const Default = Template.bind({});

(Default as any).args = {
  onClick: () => console.log("on click")
}
        `;

    const fileName = this.dir + "/" + this.funcFileName + ".stories.js";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log(
        "Асинхронная запись stories файла завершена. Содержимое файла:"
      );
    });
  }


  createScssFile(): void {
    const content = `.${this.funcFileName}{
            
}`;

    const fileName = this.dir + "/" + this.funcFileName + ".module.scss";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись css файла завершена. Содержимое файла:");
    });
  }

  createTestFile(): void {
    const content = `
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import ${this.funcFileName} from "./${this.funcFileName}";
import classes from './${this.funcFileName}.module.scss';


describe("${this.funcFileName}", () => {

    let _render = null;
    
    describe("Snapshots", () => {
    
        beforeEach(() => {
        
            _render = render(<${this.funcFileName} />);
        
        });

        afterEach(cleanup)
    
        test("matches snapshot", () => {
          const { baseElement } = _render;
          expect(baseElement).toMatchSnapshot();
        });
    
    });

});

        `;

    const fileName = this.dir + "/" + this.funcFileName + ".test.js";

    //console.log(fileName);
    //console.log(content);

    fs.writeFile(fileName, content, (error: any) => {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись тестогого файла завершена.");
    });
  }
}

new CreateReactFuncTS(args[0], args[1]);

export default CreateReactFuncTS;
 */
