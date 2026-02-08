import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

interface ImageQueryData {
  images: {
    edges: Array<{
      node: {
        relativePath: string;
        extension: string;
        publicURL: string;
        childImageSharp?: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    }>;
  };
}

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * @description assets 디렉토리 이미지를 렌더링하는 컴포넌트
 * @param {ImageProps} props 이미지 props
 * @return {JSX.Element | null}
 */
const Image = ({ src, alt, className }: ImageProps) => {
  const data = useStaticQuery<ImageQueryData>(graphql`
    query {
      images: allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  const match = useMemo(
    () => data.images.edges.find(({ node }) => src === node.relativePath),
    [data, src],
  );

  if (src.startsWith('/')) {
    return <img src={src} alt={alt ?? src} className={className} />;
  }

  if (!match) return null;

  const { node: { childImageSharp, publicURL, extension } = {} } = match;

  if (!publicURL) return null;

  if (extension === 'svg' || extension === 'gif' || !childImageSharp) {
    return <img src={publicURL} alt={alt ?? publicURL} className={className} />;
  }

  return (
    <GatsbyImage
      image={childImageSharp.gatsbyImageData}
      alt={alt ?? publicURL}
      className={className}
    />
  );
};

export default Image;
