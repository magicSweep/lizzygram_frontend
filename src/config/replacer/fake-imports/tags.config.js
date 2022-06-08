exports.default = [
  {
    pathToFile: "src/tags/hook/useTags/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | TAGS SERVICE",
    replaceable: '"../../service/tagsDb"',
    replacement: '"../../service/tagsDb/tagsDb.fake"',
  },
];
