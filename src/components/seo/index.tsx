import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import type { SiteMetadata } from '../../types/site';

interface SeoProps {
  description?: string;
  title?: string;
}

interface SeoQueryData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

/**
 * @description 페이지 SEO 메타 태그
 * @param {SeoProps} props SEO props
 * @return {JSX.Element}
 */
function Seo({ description, title }: SeoProps) {
  const { site } = useStaticQuery<SeoQueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author {
            name
          }
          ogImage
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_title`,
          content: title,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: 'og:author',
          content: site.siteMetadata.author.name,
        },
        {
          property: 'og:image',
          content: site.siteMetadata.ogImage,
        },

        {
          property: `og:type`,
          content: `website`,
        },
      ]}
    />
  );
}

export default Seo;
