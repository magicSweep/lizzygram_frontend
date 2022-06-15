/* export * from "./auth.config";
export * from "./tags.config";
export * from "./init.config";
export * from "./loadPhotos.config";
export * from "./addEditPhoto.config";
 */

const initCnf = require("./init.config").default;
const cnfCnf = require("./cnf.config").default;
const authCnf = require("./auth.config").default;
const tagsCnf = require("./tags.config").default;
const loadPhotosCnf = require("./loadPhotos.config").default;
const addPhotoCnf = require("./addPhoto.config").default;
const editPhotoCnf = require("./editPhoto.config").default;
const favoritePhotoCnf = require("./favoritePhoto.config").default;

exports.default = [
  ...initCnf,
  ...cnfCnf,
  ...authCnf,
  ...tagsCnf,
  ...loadPhotosCnf,
  ...addPhotoCnf,
  ...editPhotoCnf,
  ...favoritePhotoCnf,
];
