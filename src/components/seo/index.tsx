import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import type { SiteMetadata } from '../../types/site';

interface SeoProps {
  description?: string;
  title?: string;
  pathname?: string;
  image?: string;
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
function Seo({ description, title, pathname = '/', image }: SeoProps) {
  const { site } = useStaticQuery<SeoQueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          language
          siteUrl
          author {
            name
          }
          ogImage
        }
      }
    }
  `);

  const { siteMetadata } = site;
  const pageTitle = title || siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${siteMetadata.siteUrl}${normalizedPath}`;
  const metaImage = image || siteMetadata.ogImage;
  const ogImageUrl = metaImage.startsWith('http')
    ? metaImage
    : `${siteMetadata.siteUrl}${metaImage}`;

  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.language || 'ko' }}
      title={pageTitle}
      defaultTitle={siteMetadata.title}
      link={[{ rel: 'canonical', href: canonicalUrl }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:site_name`,
          content: siteMetadata.title,
        },
        {
          property: `og:url`,
          content: canonicalUrl,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: ogImageUrl,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: 'og:author',
          content: siteMetadata.author.name,
        },
      ]}
    />
  );
}

export default Seo;
