import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import ThemeSwitch from '../components/theme-switch';

interface LayoutQueryData {
  site: {
    siteMetadata: {
      title: string;
      author: {
        name: string;
        social?: {
          github?: string;
        };
      };
    };
  };
}

interface LayoutProps {
  children: React.ReactNode;
  tableOfContents?: string;
  contentMaxWidth?: string;
}

/**
 * @description 페이지 기본 레이아웃
 * @param {LayoutProps} props 레이아웃 props
 * @return {JSX.Element}
 */
const Layout = ({ children, tableOfContents, contentMaxWidth = 'max-w-[960px]' }: LayoutProps) => {
  const data = useStaticQuery<LayoutQueryData>(graphql`
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

  const removeEmojiText = (text: string) =>
    text
      .replace(/&#x([0-9a-f]+);/gi, (match, hex: string) => {
        const codePoint = Number.parseInt(hex, 16);
        const isEmojiCodePoint =
          (codePoint >= 0x1f300 && codePoint <= 0x1faff) ||
          (codePoint >= 0x2600 && codePoint <= 0x27bf) ||
          codePoint === 0xfe0f ||
          codePoint === 0x200d;
        return isEmojiCodePoint ? '' : match;
      })
      .replace(/&#([0-9]+);/g, (match, decimal: string) => {
        const codePoint = Number.parseInt(decimal, 10);
        const isEmojiCodePoint =
          (codePoint >= 0x1f300 && codePoint <= 0x1faff) ||
          (codePoint >= 0x2600 && codePoint <= 0x27bf) ||
          codePoint === 0xfe0f ||
          codePoint === 0x200d;
        return isEmojiCodePoint ? '' : match;
      })
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
      .replace(/[\u2600-\u27BF]/g, '')
      .replace(/\uFE0F/g, '')
      .replace(/\u200D/g, '');

  const sanitizedTableOfContents = tableOfContents
    ? removeEmojiText(tableOfContents).replace(
        /(<a[^>]*>)([\s\S]*?)(<\/a>)/gi,
        (_match, openTag: string, label: string, closeTag: string) => {
          const cleanedLabel = label.replace(/\s{2,}/g, ' ').trim();
          return `${openTag}${cleanedLabel || label}${closeTag}`;
        },
      )
    : undefined;

  return (
    <div className="w-full min-h-screen px-4 break-keep font-sans text-[var(--primary-text-color)] antialiased sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col">
        <PageHeader siteTitle={title || `Title`} />
        <div className="relative flex w-full flex-1 justify-center">
          <main className={`w-full pb-14 pt-2 md:pb-20 md:pt-4 ${contentMaxWidth}`}>
            {children}
          </main>
        </div>
        {tableOfContents && (
          <aside
            className="layout-toc no-scrollbar fixed top-28 hidden max-h-[calc(100vh-160px)] w-[170px] overflow-y-auto text-[var(--secondary-text-color)] xl:block"
            style={{ right: 'max(16px, calc((100vw - 1280px) / 2 + 12px))' }}
            dangerouslySetInnerHTML={{ __html: sanitizedTableOfContents || '' }}
          />
        )}
        <PageFooter
          author={author.name || `Author`}
          githubUrl={author.social?.github || `https://www.github.com`}
        />
      </div>
      <ThemeSwitch />
    </div>
  );
};

export default Layout;
