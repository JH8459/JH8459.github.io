import type { PostModel, PostNode } from '../types/post';

/**
 * @description 마크다운 노드를 UI용 포스트 모델로 변환
 */
export default class Post implements PostModel {
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

  /**
   * @description 포스트 모델 생성자
   * @param {PostNode} node 마크다운 노드 데이터
   * @return {void}
   */
  constructor(node: PostNode) {
    this.id = node.id;
    this.html = node.html;
    this.excerpt = node.excerpt;
    this.timeToRead = node.timeToRead;
    this.tableOfContents = node.tableOfContents;
    this.slug = node.fields.slug;
    this.emoji = node.frontmatter.emoji;
    this.categories = node.frontmatter.categories.split(' ');
    this.title = node.frontmatter.title;
    this.author = node.frontmatter.author;
    this.date = node.frontmatter.date;
    this.thumbnail = node.frontmatter.thumbnail;
  }
}
