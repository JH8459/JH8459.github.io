/**
 * @description 마크다운 프론트매터 정보
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  categories: string;
  author?: string;
  emoji?: string;
  thumbnail?: string;
}

/**
 * @description 마크다운 노드 필드 정보
 */
export interface PostFields {
  slug: string;
}

/**
 * @description 마크다운 노드 데이터 구조
 */
export interface PostNode {
  id: string;
  html?: string;
  excerpt?: string;
  timeToRead?: number;
  tableOfContents?: string;
  fields: PostFields;
  frontmatter: PostFrontmatter;
}

/**
 * @description 렌더링에 사용하는 포스트 모델
 */
export interface PostModel {
  id: string;
  html?: string;
  excerpt?: string;
  timeToRead?: number;
  tableOfContents?: string;
  slug: string;
  emoji?: string;
  categories: string[];
  title: string;
  author?: string;
  date: string;
  thumbnail?: string;
  views?: number;
}
