exports.default = [
  //AUTH
  {
    pathToFile: "src/auth/hook/useAuthSubscribe/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE AUTH SUBSCRIBE",
        replaceable: "../../service/AuthService",
      },
    ],
  },
  {
    pathToFile: "src/auth/hook/useEditor/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE EDITOR",
        replaceable: "../../service/UserService",
      },
    ],
  },
  {
    pathToFile: "src/auth/hook/useLogin/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE LOGIN",
        replaceable: "../../service/AuthService",
      },
    ],
  },
  {
    pathToFile: "src/auth/hook/useLogout/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE LOGOUT 1",
        replaceable: "../../service/AuthService",
      },
      {
        identifier: "REPLACER | USE LOGOUT 2",
        replaceable: "../../service/UserService",
      },
    ],
  },
  {
    pathToFile: "src/auth/hook/usePermissions/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE PERMISSIONS",
        replaceable: "../../service/UserService",
      },
    ],
  },
  {
    pathToFile: "src/auth/hook/useToken/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | USE TOKEN",
        replaceable: "../../service/UserService",
      },
    ],
  },
  // TAGS
  {
    pathToFile: "src/tags/hook/useTags",
    options: [
      {
        identifier: "REPLACER | USE TAGS",
        replaceable: "../../service/tagsDb",
      },
    ],
  },
  // ADD PHOTO
  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | ADD PHOTO",
        replaceable: "./../../../../../../../service/firebaseAuth",
      },
    ],
  },

  {
    pathToFile:
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | ADD PHOTO",
        replaceable: "./service/requests",
      },
    ],
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
      "src/photos/addEditPhoto/add/container/AddPhotoProcess/hook/useAddPhotoProcess/index.ts",
    // identify in log messages
    options: [
      {
        identifier: "REPLACER | ADD PHOTO",
        replaceable: "./../../../../../common/service/cleanUp",
      },
    ],
  },
];
