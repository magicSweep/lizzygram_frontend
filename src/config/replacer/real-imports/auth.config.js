exports.default = [
  {
    pathToFile: "src/auth/hook/usePermissions/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService/UserService.fake"',
    replacement: '"../../service/UserService"',
  },

  {
    pathToFile: "src/auth/hook/useLogout/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService/UserService.fake"',
    replacement: '"../../service/UserService"',
  },

  {
    pathToFile: "src/auth/hook/useLogout/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService/AuthService.fake"',
    replacement: '"../../service/AuthService"',
  },

  {
    pathToFile: "src/auth/hook/useLogin/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService/AuthService.fake"',
    replacement: '"../../service/AuthService"',
  },

  {
    pathToFile: "src/auth/hook/useEditor/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/UserService/UserService.fake"',
    replacement: '"../../service/UserService"',
  },

  {
    pathToFile: "src/auth/hook/useAuthSubscribe/index.ts",
    // identify in log messages
    identifier: "REPLACER | REAL IMPORTS | AUTH SERVICES",
    replaceable: '"../../service/AuthService/AuthService.fake"',
    replacement: '"../../service/AuthService"',
  },
];
