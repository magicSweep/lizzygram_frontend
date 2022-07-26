exports.default = [
  {
    pathToFile: ".storybook-modules/preview.js",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | FIREBASE INIT",
    replaceable: '"../src/service/firebase/init.fake"',
    replacement: '"../src/service/firebase/init"',
  },
];
