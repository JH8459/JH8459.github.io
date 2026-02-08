import type { IGatsbyImageData } from 'gatsby-plugin-image';

/**
 * @description Gatsby 이미지 파일 데이터 구조
 */
export interface GatsbyImageFile {
  childImageSharp?: {
    gatsbyImageData: IGatsbyImageData;
  };
}
