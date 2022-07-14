const babelOptions = {
  presets: [
    ["babel-preset-gatsby", { targets: { node: "12.0" } }],
    "@babel/preset-typescript",
  ],
  //plugins: ["@babel/transform-runtime", "babel-plugin-transform-import-meta"],
};
module.exports = require("babel-jest").default.createTransformer(babelOptions);
