exports.default = [
  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | EDIT PHOTO",
    replaceable: '"./../../../../../../../service/firebase/firebase.auth.fake"',
    replacement: '"./../../../../../../../service/firebase/firebase.auth"',
  },

  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | EDIT PHOTO",
    replaceable: '"./service/requests/requests.fake"',
    replacement: '"./service/requests"',
  },

  {
    pathToFile:
      "src/photos/addEditPhoto/edit/container/EditPhotoProcess/hook/useEditPhotoProcess/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | EDIT PHOTO",
    replaceable: '"./../../../../../common/service/cleanUp/cleanUp.fake"',
    replacement: '"./../../../../../common/service/cleanUp"',
  },
];
