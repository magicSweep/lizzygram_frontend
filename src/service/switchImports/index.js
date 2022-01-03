"use strict";
exports.__esModule = true;
exports.tagsServiceImports = exports.authDbServiceImports = exports.authServiceImports = exports.photoDbImports = exports.photoWorkerImports = void 0;
var path_1 = require("path");
var pathToPhotosServices = (0, path_1.join)(process.cwd(), "src/photos/service");
var pathToAuthServices = (0, path_1.join)(process.cwd(), "src/auth/service");
var pathToTagsServices = (0, path_1.join)(process.cwd(), "src/tags/service");
exports.photoWorkerImports = {
    pathToFile: "".concat(pathToPhotosServices, "/WorkerService.ts"),
    imports: {
        truly: 'import { add, edit } from "../api/worker";'
    }
};
exports.photoDbImports = {
    pathToFile: "".concat(pathToPhotosServices, "/DbService.ts"),
    imports: {
        truly: "\"../repository/firestore\";"
    }
};
exports.authServiceImports = {
    pathToFile: "".concat(pathToAuthServices, "/AuthService.ts"),
    imports: {
        truly: "\"./../../firebase/firebase.auth\";"
    }
};
exports.authDbServiceImports = {
    pathToFile: "".concat(pathToAuthServices, "/DbService.ts"),
    imports: {
        truly: '"../repository/firestore";'
    }
};
exports.tagsServiceImports = {
    pathToFile: "".concat(pathToTagsServices, "/index.ts"),
    imports: {
        truly: '"../repository/firestore";'
    }
};
//[tagsServiceImports as SwitchImportProps].map(switchImport);
