/* exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
  getConfig,
}) => {
  if (stage === "build-javascript") {
    const config = getConfig();

    ///  console.log("========CREATE WEBPACK CONFIG");
   // console.log("========STAGE=======", stage);
   // console.log("OPTIMIZATION", config["optimization"]);
   // console.log("==================END============"); 

    const minimizer = config.optimization.minimizer;

    config["optimization"] = {
      minimize: true,
      runtimeChunk: true,
      minimizer,
      splitChunks: {
        chunks: "all",
        //minSize: 30000,
        //maxSize: 100000,
        /* cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },/
      },
    };

    // This will completely replace the webpack config with the modified object.
    actions.replaceWebpackConfig(config);
  }
}; */

/* {
    minimize: true,

    runtimeChunk: true,

    /* splitChunks: {
      chunks: "all",
      name(module: any, chunks: any, cacheGroupKey: any) {
        const moduleFileName = module
          .identifier()
          .split("/")
          .reduceRight((item: any) => item);
        const allChunksNames = chunks.map((item: any) => item.name).join("~");
        return `${cacheGroupKey}-${allChunksNames}`;
      },
    },
 /
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  } */
