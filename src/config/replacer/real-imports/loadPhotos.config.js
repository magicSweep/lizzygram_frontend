exports.default = [
  {
    pathToFile: "src/i-photos/loadPhotos/hook/usePhotos/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | PHOTOS SERVICE",
    replaceable: '"../../service/PhotosDb/PhotosDb.fake"',
    replacement: '"../../service/PhotosDb"',
  },
];
