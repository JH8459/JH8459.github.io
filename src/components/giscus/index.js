import React, { createRef, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const src = 'https://giscus.app/client.js';

function Giscus() {
  const rootElm = createRef();
  const isGiscusLoaded = useRef(false);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          comments {
            giscus {
              repo
              repoId
              category
              categoryId
            }
          }
        }
      }
    }
  `);

  const { repo, repoId, category, categoryId } = data.site.siteMetadata.comments.giscus;

  useEffect(() => {
    if (!rootElm.current || isGiscusLoaded.current) return;

    const storedIsDarkMode = localStorage.getItem('isDarkMode');
    const giscus = document.createElement('script');
    const giscusConfig = {
      src,
      'data-repo': repo,
      'data-repo-id': repoId,
      'data-category': category,
      'data-category-id': categoryId,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': JSON.parse(storedIsDarkMode) ? 'dark' : 'light',
      'data-lang': 'ko',
      crossorigin: 'anonymous',
      async: true,
    };

    Object.keys(giscusConfig).forEach((configKey) => {
      giscus.setAttribute(configKey, giscusConfig[configKey]);
    });

    rootElm.current.appendChild(giscus);
    isGiscusLoaded.current = true;
  }, [rootElm, repo, repoId, category, categoryId]);

  return <div id="giscus-comments" ref={rootElm} />;
}

export default Giscus;
