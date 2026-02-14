import React from 'react';

interface PageFooterProps {
  author: string;
  githubUrl: string;
}

/**
 * @description 페이지 푸터
 * @param {PageFooterProps} props 푸터 props
 * @return {JSX.Element}
 */
function PageFooter({ author, githubUrl }: PageFooterProps) {
  return (
    <footer className="mt-auto border-t border-[var(--post-card-border-color)] py-6">
      <p className="text-center text-[13px] text-[var(--secondary-text-color)] md:text-[14px]">
        © {new Date().getFullYear()}
        &nbsp;
        <a
          href={githubUrl}
          className="font-semibold text-[var(--primary-text-color)] hover:underline"
        >
          {author}
        </a>
        &nbsp;· powered by
        <a
          href="https://github.com/JH8459/JH8459.github.io"
          className="ml-1 font-semibold text-[var(--primary-text-color)] hover:underline"
        >
          gatsby-blog
        </a>
      </p>
    </footer>
  );
}

export default PageFooter;
