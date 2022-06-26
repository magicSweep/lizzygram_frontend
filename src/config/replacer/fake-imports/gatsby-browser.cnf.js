//import { init } from "./src/firebase/init";
exports.default = [
  {
    pathToFile: "gatsby-browser.js",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | GATSBY BROWSER",
    replaceable: '"./src/i-service/firebase/init"',
    replacement: '"./src/i-service/firebase/init.fake"',
  },
];
