import type { AboutMetadata } from './about';

/**
 * @description 작성자 소개(바이오) 정보
 */
export interface AuthorBio {
  role: string;
  description: string[];
  thumbnail: string;
}

/**
 * @description 작성자 소셜 링크
 */
export interface AuthorSocial {
  github?: string;
  linkedIn?: string;
  email?: string;
}

/**
 * @description 작성자 프로필 메타데이터
 */
export interface AuthorMetadata {
  name: string;
  bio: AuthorBio;
  social: AuthorSocial;
}

/**
 * @description Giscus 설정 메타데이터
 */
export interface GiscusMetadata {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

/**
 * @description 댓글 시스템 메타데이터
 */
export interface CommentsMetadata {
  giscus?: GiscusMetadata;
}

/**
 * @description 사이트 전역 메타데이터 구조
 */
export interface SiteMetadata {
  title: string;
  description: string;
  language: string;
  siteUrl: string;
  ogImage: string;
  googleTrakingId?: string;
  firebaseApiKey?: string;
  firebaseAuthDomain?: string;
  firebaseDatabaseURL?: string;
  firebaseProjectId?: string;
  firebaseStorageBucket?: string;
  firebaseMessagingSenderId?: string;
  firebaseAppId?: string;
  author: AuthorMetadata;
  comments?: CommentsMetadata;
  about?: AboutMetadata;
}
