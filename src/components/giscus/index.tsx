import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import type { SiteMetadata } from '../../types/site';

const src = 'https://giscus.app/client.js';

interface GiscusProps {
  repo?: string;
  path?: string;
}

interface GiscusQueryData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

/**
 * @description Giscus 댓글 위젯
 * @param {GiscusProps} props 위젯 props
 * @return {JSX.Element}
 */
function Giscus({ repo, path }: GiscusProps) {
  const rootElm = useRef<HTMLDivElement | null>(null);
  const isGiscusLoaded = useRef<boolean>(false);

  const data = useStaticQuery<GiscusQueryData>(graphql`
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

  const {
    repo: repoFromMeta,
    repoId,
    category,
    categoryId,
  } = data.site.siteMetadata.comments?.giscus || {};

  useEffect(() => {
    if (!rootElm.current || isGiscusLoaded.current) return;
    if (!repoFromMeta || !repoId || !category || !categoryId) return;

    // 테마 정보를 읽어 Giscus 테마를 결정
    const storedIsDarkMode = localStorage.getItem('isDarkMode');
    const giscus = document.createElement('script');
    const giscusConfig: Record<string, string> = {
      src,
      'data-repo': repo ?? repoFromMeta,
      'data-repo-id': repoId,
      'data-category': category,
      'data-category-id': categoryId,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': JSON.parse(storedIsDarkMode || 'false') ? 'dark' : 'light',
      'data-lang': 'ko',
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.keys(giscusConfig).forEach((configKey) => {
      giscus.setAttribute(configKey, giscusConfig[configKey]);
    });

    // 위젯 스크립트 삽입
    rootElm.current.appendChild(giscus);
    isGiscusLoaded.current = true;
  }, [repoFromMeta, repo, repoId, category, categoryId, path]);

  return <div id="giscus-comments" ref={rootElm} />;
}

export default Giscus;
