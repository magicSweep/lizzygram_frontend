import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: any[];
  title: string;
};

const SEO: FC<SEOProps> = ({
  description = "",
  lang = "ru",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  );

  const keywords = site.siteMetadata.keywords;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        /*  {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        }, */
      ].concat(meta)}
    >
      <script
        crossorigin
        src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"
      ></script>
    </Helmet>
  );
};

export default SEO;
