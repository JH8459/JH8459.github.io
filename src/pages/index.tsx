import React, { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { graphql, navigate, type PageProps } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import Post from '../models/post';
import { getUniqueCategories } from '../utils/helpers';
import { getPostViewCounts } from '../utils/viewCounts';
import PostTabs from '../components/post-tabs';
import type { PostNode, PostModel, PostViewCounts } from '../types/post';
import type { SiteMetadata } from '../types/site';
import type { GatsbyImageFile } from '../types/image';

interface HomePageData {
  allMarkdownRemark: {
    edges: Array<{ node: PostNode }>;
  };
  defaultThumbnail: GatsbyImageFile;
  site: {
    siteMetadata: SiteMetadata;
  };
}

type SortType = 'date-desc' | 'date-asc' | 'title-asc' | 'views-desc';

const sortTypes: SortType[] = ['date-desc', 'date-asc', 'title-asc', 'views-desc'];

/**
 * @description Hydration 이후 클라이언트 스냅샷 재확인을 위한 빈 구독
 * @return {() => void} 구독 해제 함수
 */
const subscribeToSortType = () => () => undefined;

/**
 * @description 쿼리스트링에서 유효한 포스트 정렬 타입을 반환
 * @param {string} search 쿼리스트링
 * @return {SortType} 포스트 정렬 타입
 */
const getSortType = (search: string): SortType => {
  const sortType = new URLSearchParams(search).get('sort');
  return sortTypes.includes(sortType as SortType) ? (sortType as SortType) : 'date-desc';
};

interface SortChangeEvent {
  target: {
    value: SortType;
  };
}

type HomePageProps = PageProps<HomePageData>;

/**
 * @description 홈 페이지
 * @param {HomePageProps} props Gatsby 페이지 props
 * @return {JSX.Element}
 */
function HomePage({ data }: HomePageProps) {
  // 마크다운 데이터를 포스트 모델로 변환
  const posts: PostModel[] = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));
  const { author, language } = data.site.siteMetadata;
  const categories = ['All', ...getUniqueCategories(posts)];
  const featuredTabIndex = categories.findIndex((category) => category === 'featured');
  const [tabIndex, setTabIndex] = useState<number>(featuredTabIndex === -1 ? 0 : featuredTabIndex);

  const location = useLocation();
  const sortType = useSyncExternalStore<SortType>(
    subscribeToSortType,
    () => getSortType(location.search),
    () => 'date-desc',
  );

  /**
   * @description 탭 변경 핸들러
   * @param {React.MouseEvent | null} _event 클릭 이벤트
   * @param {number} value 탭 인덱스
   * @return {void}
   */
  const onTabIndexChange = useCallback((_: React.MouseEvent | null, value: number) => {
    setTabIndex(value);
  }, []);

  /**
   * @description 정렬 변경 핸들러
   * @param {SortChangeEvent} event 정렬 이벤트
   * @return {void}
   */
  const onSortChange = useCallback(
    (event: SortChangeEvent) => {
      const newSortType = event.target.value;

      // 정렬 값을 URL에 동기화
      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.set('sort', newSortType);
      navigate(`${location.pathname}?${newQueryParams.toString()}`, { replace: true });
    },
    [location],
  );

  const [viewCounts, setViewCounts] = useState<PostViewCounts>({});

  useEffect(() => {
    let isActive = true;

    getPostViewCounts()
      .then((counts) => {
        if (isActive) setViewCounts(counts);
      })
      .catch((error) => {
        console.error('Firebase read failed: ', error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const sortedPosts = useMemo(() => {
    // 조회수 정보를 병합해 정렬 기준을 구성
    const postsWithViews = posts.map((post) => ({
      ...post,
      views: viewCounts[post.slug.replace(/\//g, '')]?.views || 0,
    }));

    switch (sortType) {
      case 'title-asc':
        return postsWithViews.sort((a, b) => a.title.localeCompare(b.title));
      case 'views-desc':
        return postsWithViews.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      case 'date-asc':
        return postsWithViews.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      case 'date-desc':
      default:
        return postsWithViews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
  }, [posts, viewCounts, sortType]);

  return (
    <Layout>
      <Seo title="JH's Engineering Notes" pathname={location.pathname} />
      <Bio author={author} language={language} />
      <PostTabs
        posts={sortedPosts}
        onChange={onTabIndexChange}
        tabs={categories}
        tabIndex={tabIndex}
        showMoreButton
        defaultThumbnail={data.defaultThumbnail}
        sortType={sortType}
        onSortChange={onSortChange}
      />
    </Layout>
  );
}

export default HomePage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 500, truncate: true)
          timeToRead
          tableOfContents
          frontmatter {
            categories
            title
            date(formatString: "YYYY.MM.DD")
            thumbnail # Add thumbnail here
          }
          fields {
            slug
            isNew
          }
        }
      }
    }

    defaultThumbnail: file(relativePath: { eq: "common/no-image.png" }) {
      childImageSharp {
        gatsbyImageData(width: 100, height: 100, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }

    site {
      siteMetadata {
        language
        author {
          name
          bio {
            role
            description
            thumbnail
          }
          social {
            github
            linkedIn
            yozmIt
            email
          }
        }
      }
    }
  }
`;
