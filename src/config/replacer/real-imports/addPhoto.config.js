exports.default = [
  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable:
      '"./../../../../../../../i-service/firebase/firebase.auth.fake"',
    replacement: '"./../../../../../../../i-service/firebase/firebase.auth"',
  },

  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./service/requests/requests.fake"',
    replacement: '"./service/requests"',
  },

  /*  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./service/dataAdapter/dataAdapter.fake"',
    replacement: '"./service/dataAdapter"',
  }, */

  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./../../../../../common/service/cleanUp/cleanUp.fake"',
    replacement: '"./../../../../../common/service/cleanUp"',
  },
];
