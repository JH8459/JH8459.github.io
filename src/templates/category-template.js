import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase-v9.0';
import { getDatabase, ref, get } from 'firebase/database';

import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import CategoryPageHeader from '../components/category-page-header';
import PostTabs from '../components/post-tabs';

function CategoryTemplate({ pageContext }) {
  const { edges, currentCategory, defaultThumbnail, categories } = pageContext;

  const [viewCounts, setViewCounts] = useState({});
  const [sortType, setSortType] = useState('date-desc');

  const posts = useMemo(() => edges.map(({ node }) => new Post(node)), [edges]);

  const currentTabIndex = useMemo(
    () => categories.findIndex((category) => category === currentCategory),
    [categories, currentCategory],
  );

  const onTabIndexChange = useCallback(
    (e, value) => {
      if (value === 0) return navigate(`/posts`);
      navigate(`/posts/${categories[value]}`);
    },
    [categories],
  );

  useEffect(() => {
    const database = getDatabase(firebase);
    const postsRef = ref(database, 'posts');
    get(postsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setViewCounts(snapshot.val());
        }
      })
      .catch((error) => {
        console.error('Firebase read failed: ', error);
      });
  }, []);

  const sortedPosts = useMemo(() => {
    const postsWithViews = posts.map((post) => ({
      ...post,
      views: viewCounts[post.slug.replace(/\//g, '')]?.views || 0,
    }));

    switch (sortType) {
      case 'title-asc':
        return postsWithViews.sort((a, b) => a.title.localeCompare(b.title));
      case 'views-desc':
        return postsWithViews.sort((a, b) => b.views - a.views);
      case 'date-asc':
        return postsWithViews.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'date-desc':
      default:
        return postsWithViews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [posts, viewCounts, sortType]);

  return (
    <Layout>
      <Seo title="Posts" />
      <CategoryPageHeader title={categories[currentTabIndex]} subtitle={`${posts.length} posts`} />
      <PostTabs
        tabIndex={currentTabIndex}
        onChange={onTabIndexChange}
        tabs={categories}
        posts={sortedPosts}
        defaultThumbnail={defaultThumbnail}
        sortType={sortType}
        onSortChange={(e) => setSortType(e.target.value)}
      />
    </Layout>
  );
}

export default CategoryTemplate;
