import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import ThemeSwitch from '../components/theme-switch';



const Layout = ({ children, tableOfContents }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
            social {
              github
            }
          }
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 break-keep antialiased font-sans text-[var(--primary-text-color)]">
      <PageHeader siteTitle={title || `Title`} />
      <div className="flex justify-center w-full">
        <main className="flex flex-col items-center w-full max-w-content">{children}</main>
        {tableOfContents && (
          <div
            className="hidden lg:block fixed"
            style={{
              top: '200px', // Adjust this value based on your header height and desired offset
              left: 'calc(50% + 360px + 50px)', // 50% + max-w-content/2 + margin
              width: '200px',
              maxHeight: 'calc(100vh - 220px)', // Adjust based on top offset
              overflowY: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: tableOfContents }}
          />
        )}
      </div>
      <PageFooter
        author={author.name || `Author`}
        githubUrl={author.social?.github || `https://www.github.com`}
      />
      <ThemeSwitch />
    </div>
  );
};

export default Layout;
