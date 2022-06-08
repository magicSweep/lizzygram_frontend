exports.default = [
  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | ADD PHOTO",
    replaceable: '"./../../../../../../../i-service/firebase/firebase.auth"',
    replacement:
      '"./../../../../../../../i-service/firebase/firebase.auth.fake"',
  },

  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | ADD PHOTO",
    replaceable: '"./service/requests"',
    replacement: '"./service/requests/requests.fake"',
  },

  /*  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | ADD PHOTO",
    replaceable: '"./service/dataAdapter"',
    replacement: '"./service/dataAdapter/dataAdapter.fake"',
  }, */

  {
    pathToFile:
      "src/i-photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | ADD PHOTO",
    replaceable: '"./../../../../../common/service/cleanUp"',
    replacement: '"./../../../../../common/service/cleanUp/cleanUp.fake"',
  },
];
