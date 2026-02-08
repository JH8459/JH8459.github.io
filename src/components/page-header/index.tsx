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
        <header className="flex justify-center w-full h-[60px]">
          <div className="flex items-center justify-between max-w-[720px] w-full px-4">
            <div className="flex-shrink-0">
              <Link
                className="font-bold text-[17px] text-[var(--primary-text-color)] md:text-[20px]"
                to="/"
              >
                {siteTitle}
              </Link>
            </div>
            <nav className="flex items-center">
              <Link
                className="text-[17px] text-[var(--primary-text-color)] mr-[10px] md:mr-[20px] font-bold"
                to="/about"
              >
                about
              </Link>
              <Link
                className="text-[17px] text-[var(--primary-text-color)] mr-[10px] md:mr-[20px] font-bold"
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
