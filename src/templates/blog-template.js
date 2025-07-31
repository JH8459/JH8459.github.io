import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase-v9.0';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import PostHeader from '../components/post-header';
import PostNavigator from '../components/post-navigator';
import Post from '../models/post';
import PostContent from '../components/post-content';
import Utterances from '../components/utterances';

function BlogTemplate({ data }) {
  const [viewCount, setViewCount] = useState(0);

  const curPost = new Post(data.cur);
  const prevPost = data.prev ? new Post(data.prev) : null;
  const nextPost = data.next ? new Post(data.next) : null;
  const { siteUrl, comments } = data.site?.siteMetadata;
  const utterancesRepo = comments?.utterances?.repo;

  useEffect(() => {
    if (!siteUrl) return;

    const key = curPost.slug.replace(/\//g, '');

    const database = getDatabase(firebase);
    const postRef = ref(database, 'posts/' + key);

    get(child(ref(database), `posts/${key}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const currentViews = snapshot.val().views;

          if (process.env.NODE_ENV !== 'development') {
            const updatedViews = currentViews + 1;

            update(postRef, { views: updatedViews });
            setViewCount(updatedViews);
          } else {
            setViewCount(currentViews);
          }
        } else {
          if (process.env.NODE_ENV !== 'development') {
            // key 값이 존재하지 않으면 1으로 설정
            set(postRef, { views: 1 });
            setViewCount(1); // 상태 업데이트
          }
        }
      })
      .catch((error) => {
        console.error('Firebase read failed: ', error);
      });
  }, [siteUrl, curPost.slug]);

  return (
    <Layout tableOfContents={curPost.tableOfContents}>
      <Seo title={curPost?.title} description={curPost?.excerpt} />
      <PostHeader post={curPost} viewCount={viewCount} />
      <PostContent html={curPost.html} />
      <PostNavigator prevPost={prevPost} nextPost={nextPost} />
      {utterancesRepo && <Utterances repo={utterancesRepo} path={curPost.slug} />}
    </Layout>
  );
}

export default BlogTemplate;

export const pageQuery = graphql`
  query($slug: String, $nextSlug: String, $prevSlug: String) {
    cur: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 500, truncate: true)
      timeToRead
      tableOfContents
      frontmatter {
        date(formatString: "YYYY.MM.DD")

        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")

        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")

        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    site {
      siteMetadata {
        siteUrl
        comments {
          utterances {
            repo
          }
        }
      }
    }
  }
`;


