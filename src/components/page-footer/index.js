import React from 'react';
import './style.scss';

function PageFooter({ author, githubUrl }) {
  return (
    <footer className="page-footer-wrapper">
      <p className="page-footer">
        © {new Date().getFullYear()}
        &nbsp;
        <a href={githubUrl}>JH8459</a>
        &nbsp;powered by
        <a href="https://github.com/JH8459/JH8459.github.io">&nbsp;gatsby-blog</a>
      </p>
    </footer>
  );
}

export default PageFooter;
