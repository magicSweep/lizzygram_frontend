exports.default = [
  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | EDIT PHOTO",
    replaceable: '"./../../../../../../../service/firebase/firebase.auth"',
    replacement: '"./../../../../../../../service/firebase/firebase.auth.fake"',
  },

  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | EDIT PHOTO",
    replaceable: '"./service/requests"',
    replacement: '"./service/requests/requests.fake"',
  },

  /*  {
      pathToFile:
        "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
      // identify in log messages
      identifier: "REPLACER | FAKE IMPORTS | ADD PHOTO",
      replaceable: '"./service/dataAdapter"',
      replacement: '"./service/dataAdapter/dataAdapter.fake"',
    }, */

  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | EDIT PHOTO",
    replaceable: '"./../../../../../common/service/cleanUp"',
    replacement: '"./../../../../../common/service/cleanUp/cleanUp.fake"',
  },
];
