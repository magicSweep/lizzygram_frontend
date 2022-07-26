exports.default = [
  {
    pathToFile: ".storybook-modules/preview.js",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | FIREBASE INIT",
    replaceable: '"../src/service/firebase/init"',
    replacement: '"../src/service/firebase/init.fake"',
  },
];
