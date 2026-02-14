import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Post from '../../models/post';
import PostSearch from '../post-search';
import type { PostNode } from '../../types/post';

interface PageHeaderProps {
  siteTitle: string;
}

interface SearchQueryData {
  allMarkdownRemark: {
    edges: Array<{ node: PostNode }>;
  };
}

/**
 * @description 상단 헤더 및 검색 영역
 * @param {PageHeaderProps} props 헤더 props
 * @return {JSX.Element}
 */
function PageHeader({ siteTitle }: PageHeaderProps) {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            edges {
              node {
                id
                frontmatter {
                  title
                  categories
                  date(formatString: "YYYY.MM.DD")
                  author
                  emoji
                  thumbnail
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data: SearchQueryData) => (
        <header className="w-full border-b border-[var(--post-card-border-color)] py-6 md:py-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex-shrink-0">
              <Link
                className="text-[18px] font-extrabold tracking-[-0.02em] text-[var(--primary-text-color)] md:text-[22px]"
                to="/"
              >
                <span className="hidden sm:inline">{siteTitle}</span>
                <span className="sm:hidden">JH&apos;s Notes</span>
              </Link>
            </div>
            <nav className="flex items-center gap-1.5 sm:gap-3">
              <Link
                className="rounded-md px-2.5 py-1.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-[var(--secondary-text-color)] transition-colors duration-200 hover:text-[var(--primary-text-color)]"
                to="/about"
              >
                about
              </Link>
              <Link
                className="rounded-md px-2.5 py-1.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-[var(--secondary-text-color)] transition-colors duration-200 hover:text-[var(--primary-text-color)]"
                to="/posts"
              >
                posts
              </Link>
              {/* 검색 결과용 포스트 모델 변환 */}
              <PostSearch posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node))} />
            </nav>
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
