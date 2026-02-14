import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { navigate, type PageProps } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import firebase from 'gatsby-plugin-firebase-v9.0';
import { getDatabase, ref, get } from 'firebase/database';

import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import CategoryPageHeader from '../components/category-page-header';
import PostTabs from '../components/post-tabs';
import type { PostNode, PostModel } from '../types/post';
import type { GatsbyImageFile } from '../types/image';

type SortType = 'date-desc' | 'date-asc' | 'title-asc' | 'views-desc';

interface CategoryPageContext {
  edges: Array<{ node: PostNode }>;
  currentCategory: string;
  categories: string[];
  defaultThumbnail: GatsbyImageFile;
}

type CategoryTemplateProps = PageProps<Record<string, never>, CategoryPageContext>;

/**
 * @description 카테고리 목록 페이지 템플릿
 * @param {CategoryTemplateProps} props 페이지 props
 * @return {JSX.Element}
 */
function CategoryTemplate({ pageContext }: CategoryTemplateProps) {
  const { edges, currentCategory, defaultThumbnail, categories } = pageContext;

  const location = useLocation();
  // 쿼리스트링에서 초기 정렬 타입을 결정
  const queryParams = new URLSearchParams(location.search);
  const initialSortType = (queryParams.get('sort') as SortType) || 'date-desc';
  const [sortType, setSortType] = useState<SortType>(initialSortType);

  const posts: PostModel[] = useMemo(() => edges.map(({ node }) => new Post(node)), [edges]);

  const currentTabIndex = useMemo(
    () => categories.findIndex((category) => category === currentCategory),
    [categories, currentCategory],
  );

  /**
   * @description 탭 변경 핸들러
   * @param {React.MouseEvent | null} _event 클릭 이벤트
   * @param {number} value 탭 인덱스
   * @return {void}
   */
  const onTabIndexChange = useCallback(
    (_: React.MouseEvent | null, value: number) => {
      // 탭 변경 시 카테고리 경로 이동
      if (value === 0) return navigate(`/posts`);
      navigate(`/posts/${categories[value]}`);
    },
    [categories],
  );

  /**
   * @description 정렬 변경 핸들러
   * @param {{ target: { value: SortType } }} event 정렬 이벤트
   * @return {void}
   */
  const onSortChange = useCallback(
    (event: { target: { value: SortType } }) => {
      const newSortType = event.target.value;
      setSortType(newSortType);

      // 정렬 값을 URL에 동기화
      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.set('sort', newSortType);
      navigate(`${location.pathname}?${newQueryParams.toString()}`, { replace: true });
    },
    [location],
  );

  const [viewCounts, setViewCounts] = useState<Record<string, { views?: number }>>({});
  const [loadingViews, setLoadingViews] = useState<boolean>(true);

  useEffect(() => {
    const database = getDatabase(firebase);
    const postsRef = ref(database, 'posts');
    get(postsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setViewCounts(snapshot.val() as Record<string, { views?: number }>);
        }
      })
      .catch((error) => {
        console.error('Firebase read failed: ', error);
      })
      .finally(() => {
        // 조회수 로딩 종료 처리
        setLoadingViews(false);
      });
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
      case 'date-desc':
      default:
        return postsWithViews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
  }, [posts, viewCounts, sortType]);

  return (
    <Layout>
      <Seo title="Posts" pathname={location.pathname} />
      <CategoryPageHeader title={categories[currentTabIndex]} subtitle={`${posts.length} posts`} />
      <PostTabs
        tabIndex={currentTabIndex}
        onChange={onTabIndexChange}
        tabs={categories}
        posts={sortedPosts}
        defaultThumbnail={defaultThumbnail}
        sortType={sortType}
        onSortChange={onSortChange}
        loadingViews={loadingViews} // Pass loading state down
      />
    </Layout>
  );
}

export default CategoryTemplate;
