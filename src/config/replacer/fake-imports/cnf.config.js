exports.default = [
  // NUMBER OF PHOTOS PER QUERY
  {
    pathToFile: "src/config/index.ts",
    identifier: "REPLACER | CONFIG",
    // replace full line with given replaceable
    // in our case it will be search something like - export const numberOfPhotosPerQuery = 9;
    doesReplaceFullLine: true,
    replaceable: "numberOfPhotosPerQuery",
    replacement: `export const numberOfPhotosPerQuery = 5;`,
  },
];
