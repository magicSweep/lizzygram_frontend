//import { init } from "./src/firebase/init";
exports.default = [
  {
    pathToFile: "gatsby-browser.js",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | GATSBY BROWSER",
    replaceable: '"./src/service/firebase/init"',
    replacement: '"./src/service/firebase/init.fake"',
  },
];
