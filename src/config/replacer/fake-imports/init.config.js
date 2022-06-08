exports.default = [
  {
    pathToFile: ".storybook-modules/preview.js",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | FIREBASE INIT",
    replaceable: '"../src/i-service/firebase/init"',
    replacement: '"../src/i-service/firebase/init.fake"',
  },
];
