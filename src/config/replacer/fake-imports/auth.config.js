exports.default = [
  {
    pathToFile: "src/auth/hook/usePermissions/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService"',
    replacement: '"../../service/UserService/UserService.fake"',
  },

  {
    pathToFile: "src/auth/hook/useLogout/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService"',
    replacement: '"../../service/UserService/UserService.fake"',
  },

  {
    pathToFile: "src/auth/hook/useLogout/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService"',
    replacement: '"../../service/AuthService/AuthService.fake"',
  },

  {
    pathToFile: "src/auth/hook/useLogin/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService"',
    replacement: '"../../service/AuthService/AuthService.fake"',
  },

  {
    pathToFile: "src/auth/hook/useEditor/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService"',
    replacement: '"../../service/UserService/UserService.fake"',
  },

  {
    pathToFile: "src/auth/hook/useAuthSubscribe/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService"',
    replacement: '"../../service/AuthService/AuthService.fake"',
  },
];
