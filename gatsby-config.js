const lSiteMetadata = {
  siteUrl: "https://www.yourdomain.tld",
  title: "Lizzygram",
  description: "Жизнь и приключения малыша в фотографиях.",
  keywords: `фотографии`,
  //author: "@magic_man",
};

const pSiteMetadata = {
  siteUrl: "https://www.yourdomain.tld",
  title: "Супер дупер фотки",
  description: "Фотографии на любой вкус и цвет",
  keywords: `фотографии`,
  //author: "@magic_man",
};

const siteMetadata =
  process.env.BUILD_FOR === "portfolio" ? pSiteMetadata : lSiteMetadata;

module.exports = {
  siteMetadata: {
    ...siteMetadata,
    author: "@magic_man",
  },
  plugins: [
    //`gatsby-plugin-preact`,
    "gatsby-plugin-postcss",
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-loadable-components-ssr",
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
};
