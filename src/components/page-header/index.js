import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Post from '../../models/post';
import PostSearch from '../post-search';


function PageHeader({ siteTitle }) {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
            edges {
              node {
                frontmatter {
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <header className="flex justify-center w-full h-[60px]">
          <div className="flex items-center justify-between max-w-content w-full px-4">
            <div className="flex-shrink-0">
              <Link className="font-bold text-[17px] text-[var(--primary-text-color)] md:text-[20px]" to="/">
                {siteTitle}
              </Link>
            </div>
            <nav className="flex items-center">
              <Link className="text-[17px] text-[var(--primary-text-color)] mr-[10px] md:mr-[20px] font-bold" to="/about">
                about
              </Link>
              <Link className="text-[17px] text-[var(--primary-text-color)] mr-[10px] md:mr-[20px] font-bold" to="/posts">
                posts
              </Link>
              <PostSearch
                posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
              />
            </nav>
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
