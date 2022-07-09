module.exports = {
  stories: [
    //"../src/**/*.stories.mdx",
    "../src/component/**/*.stories.@(js|jsx|ts|tsx)",
    //"../src/i-photos/photoSlider/container/PhotoSlider/PhotoSliderWidget.stories.tsx",

    "../src/infiniteScroll/hook/useBlocks/useBlocks.stories.tsx",
    "../src/infiniteScroll/hook/useObserveBlocks/useObserveBlocks.stories.tsx",
    "../src/infiniteScroll/InfiniteScroll.stories.tsx",
    //"../src/infiniteScroll/hook/useMakeBlocks/useMakeBlocks.stories.tsx",
    //"../src/infiniteScroll/hook/useObserveBlocks/useObserveBlocks.stories.tsx",
    //"../src/infiniteScroll/InfiniteScroll.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    /* reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    }, */
  },
};
