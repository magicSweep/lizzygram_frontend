module.exports = {
  stories: [
    //"../src/**/*.stories.mdx",
    //"../src/photos/loadPhotos/**/*.stories.@(js|jsx|ts|tsx)",
    //auth
    "../src/auth/Auth.stories.tsx",
    // photos
    //"../src/photos/loadPhotos/LoadPhotos.stories.tsx",
    // add photo
    //"../src/photos/addEditPhoto/AddPhoto.stories.tsx",
    // edit photo
    //"../src/photos/addEditPhoto/EditPhoto.stories.tsx",
    // favorite photo
    //"../src/photos/favorite/Favorite.stories.tsx",
    //alert
    "../src/alert/Alerts.stories.tsx",
    //tags
    "../src/tags/LoadTags.stories.tsx",
    //search
    //"../src/search/Search.stories.tsx",
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
