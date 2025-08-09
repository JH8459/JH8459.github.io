import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import firebase from 'gatsby-plugin-firebase-v9.0';
import { getDatabase, ref, get } from 'firebase/database';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import Post from '../models/post';

import { getUniqueCategories } from '../utils/helpers';
import PostTabs from '../components/post-tabs';

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));
  const { author, language } = data.site.siteMetadata;
  const categories = ['All', ...getUniqueCategories(posts)];
  const featuredTabIndex = categories.findIndex((category) => category === 'featured');
  const [tabIndex, setTabIndex] = useState(featuredTabIndex === -1 ? 0 : featuredTabIndex);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSortType = queryParams.get('sort') || 'date-desc';
  const [sortType, setSortType] = useState(initialSortType);

  const onTabIndexChange = useCallback((e, value) => setTabIndex(value), []);

  const onSortChange = useCallback((e) => {
    const newSortType = e.target.value;
    setSortType(newSortType);

    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set('sort', newSortType);
    navigate(`${location.pathname}?${newQueryParams.toString()}`, { replace: true });
  }, [location]);

  const [viewCounts, setViewCounts] = useState({});
  const [loadingViews, setLoadingViews] = useState(true); // Keep loading state here

  useEffect(() => {
    setLoadingViews(true); // Set loading to true when starting fetch
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
      })
      .finally(() => {
        setLoadingViews(false); // Set loading to false after fetch completes (success or error)
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
      <Seo title="JHLog" />
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
        loadingViews={loadingViews} // Pass loading state down
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
          frontmatter {
            categories
            title
            date(formatString: "YYYY.MM.DD")
            thumbnail # Add thumbnail here
          }
          fields {
            slug
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
            email
          }
        }
      }
    }
  }
`;
