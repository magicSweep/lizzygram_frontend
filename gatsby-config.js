const lSiteMetadata = {
  siteUrl: "https://www.yourdomain.tld",
  title: "Lizzygram",
  description: "Жизнь и приключения малыша в фотографиях.",
  keywords: `фотографии`,
  //author: "@magic_man",
};

const pSiteMetadata = {
  siteUrl: "https://www.yourdomain.tld",
  title: "Фотобум",
  description: "Фотографии на любой вкус и цвет",
  keywords: `фотографии`,
  //author: "@magic_man",
};

const siteMetadata =
  process.env.GATSBY_BUILD_FOR === "lizzygram" ? lSiteMetadata : pSiteMetadata;

module.exports = {
  siteMetadata: {
    ...siteMetadata,
    author: "@magic_man",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Photo album, portfolio",
        short_name: "Photo album",
        start_url: "/",
        lang: "ru",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "standalone",
        icon: "src/icons/favicon_color_512x512.png",
        theme_color_in_head: false,
      },
    },
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
};
