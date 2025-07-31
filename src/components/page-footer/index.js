import React from 'react';

function PageFooter({ author, githubUrl }) {
  return (
    <footer className="flex justify-center items-center w-full h-[62px] mt-auto">
      <p className="max-w-content text-center text-[var(--primary-text-color)] font-sans">
        © {new Date().getFullYear()}
        &nbsp;
        <a href={githubUrl} className="text-[#3A95FF]">
          JH8459
        </a>
        &nbsp;powered by
        <a
          href="https://github.com/JH8459/JH8459.github.io"
          className="text-[#3A95FF]"
        >
          &nbsp;gatsby-blog
        </a>
      </p>
    </footer>
  );
}

export default PageFooter;
