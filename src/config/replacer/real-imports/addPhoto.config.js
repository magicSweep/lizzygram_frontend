exports.default = [
  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./../../../../../../../service/firebase/firebase.auth.fake"',
    replacement: '"./../../../../../../../service/firebase/firebase.auth"',
  },

  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./service/requests/requests.fake"',
    replacement: '"./service/requests"',
  },

  /*  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./service/dataAdapter/dataAdapter.fake"',
    replacement: '"./service/dataAdapter"',
  }, */

  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | ADD PHOTO",
    replaceable: '"./../../../../../common/service/cleanUp/cleanUp.fake"',
    replacement: '"./../../../../../common/service/cleanUp"',
  },
];
