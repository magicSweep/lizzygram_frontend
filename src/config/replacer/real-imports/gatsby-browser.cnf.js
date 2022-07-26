//import { init } from "./src/firebase/init";
exports.default = [
  {
    pathToFile: "gatsby-browser.js",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | GATSBY BROWSER",
    replaceable: '"./src/service/firebase/init.fake"',
    replacement: '"./src/service/firebase/init"',
  },
];
