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
    <footer className="flex justify-center items-center w-full h-[62px] mt-auto">
      <p className="max-w-[720px] text-center text-[var(--primary-text-color)] font-sans">
        © {new Date().getFullYear()}
        &nbsp;
        <a href={githubUrl} className="text-[#3A95FF]">
          {author}
        </a>
        &nbsp;powered by
        <a href="https://github.com/JH8459/JH8459.github.io" className="text-[#3A95FF]">
          &nbsp;gatsby-blog
        </a>
      </p>
    </footer>
  );
}

export default PageFooter;
