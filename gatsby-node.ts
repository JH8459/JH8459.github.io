import type { GatsbyNode, CreatePagesArgs } from 'gatsby';
import path from 'path';
import type { GatsbyImageFile } from './src/types/image';

interface MarkdownRemarkNode {
  id: string;
  excerpt?: string;
  html?: string;
  timeToRead?: number;
  tableOfContents?: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    categories: string;
    title: string;
    date?: string;
    author?: string;
    emoji?: string;
    thumbnail?: string;
  };
}

interface MarkdownRemarkEdge {
  node: MarkdownRemarkNode;
  next?: { fields: { slug: string } } | null;
  previous?: { fields: { slug: string } } | null;
}

interface AllMarkdownRemarkData {
  allMarkdownRemark: {
    edges: MarkdownRemarkEdge[];
  };
}

interface DefaultThumbnailData {
  file: GatsbyImageFile;
}

type CreatePageFn = CreatePagesArgs['actions']['createPage'];

/**
 * @description 마크다운 노드에 slug 필드를 추가
 * @param {GatsbyNode['onCreateNode']} args Gatsby 노드 생성 인자
 * @return {void}
 */
export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent as string) as { relativeDirectory?: string } | undefined;
    if (!fileNode?.relativeDirectory) return;
    const dirName = path.basename(fileNode.relativeDirectory);

    createNodeField({
      node,
      name: `slug`,
      value: `/${dirName}/`,
    });
  }
};

/**
 * @description 마크다운 스키마 커스터마이징
 * @param {GatsbyNode['createSchemaCustomization']} args Gatsby 스키마 인자
 * @return {void}
 */
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      title: String!
      date: Date @dateformat
      categories: String
      thumbnail: String # Keep as String
    }
  `);
};

/**
 * @description 개별 블로그 포스트 페이지 생성
 * @param createPage Gatsby createPage 함수
 * @param results 마크다운 조회 결과
 * @return {void}
 */
const createBlogPages = ({
  createPage,
  results,
}: {
  createPage: CreatePageFn;
  results: AllMarkdownRemarkData['allMarkdownRemark'];
}): void => {
  const blogPostTemplate = path.resolve('src/templates/blog-template.tsx');

  results.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        nextSlug: next?.fields.slug ?? '',
        prevSlug: previous?.fields.slug ?? '',
      },
    });
  });
};

/**
 * @description 카테고리별 글 목록 페이지 생성
 * @param createPage Gatsby createPage 함수
 * @param results 마크다운 조회 결과
 * @return {void}
 */
const createPostsPages = ({
  createPage,
  results,
}: {
  createPage: CreatePageFn;
  results: AllMarkdownRemarkData['allMarkdownRemark'] & {
    defaultThumbnail: DefaultThumbnailData['file'];
  };
}): void => {
  const categoryTemplate = path.resolve('src/templates/category-template.tsx');
  const categorySet = new Set(['All']);
  const { edges } = results;

  edges.forEach(({ node }) => {
    const postCategories = node.frontmatter.categories.split(' ');
    postCategories.forEach((category) => categorySet.add(category));
  });

  const categories = [...categorySet];

  createPage({
    path: `/posts`,
    component: categoryTemplate,
    context: {
      currentCategory: 'All',
      edges,
      categories,
      defaultThumbnail: results.defaultThumbnail,
    },
  });

  categories.forEach((currentCategory) => {
    createPage({
      path: `/posts/${currentCategory}`,
      component: categoryTemplate,
      context: {
        currentCategory,
        categories,
        edges: edges.filter(({ node }) => node.frontmatter.categories.includes(currentCategory)),
        defaultThumbnail: results.defaultThumbnail,
      },
    });
  });
};

/**
 * @description 페이지 생성 및 GraphQL 데이터 수집
 * @param {GatsbyNode['createPages']} args Gatsby createPages 인자
 * @return {Promise<void>}
 */
export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const allMarkdownRemarkResults = await graphql<AllMarkdownRemarkData>(`
    query AllMarkdownRemark {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            excerpt(pruneLength: 500)
            timeToRead
            fields {
              slug
            }
            frontmatter {
              categories
              title
              date(formatString: "YYYY.MM.DD")
              thumbnail
            }
            tableOfContents
          }
          next {
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const defaultThumbnailResults = await graphql<DefaultThumbnailData>(`
    query DefaultThumbnail {
      file(relativePath: { eq: "common/no-image.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 100
            height: 100
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  if (allMarkdownRemarkResults.errors || defaultThumbnailResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  if (!allMarkdownRemarkResults.data || !defaultThumbnailResults.data) {
    reporter.panicOnBuild(`Missing GraphQL query data.`);
    return;
  }

  createBlogPages({ createPage, results: allMarkdownRemarkResults.data.allMarkdownRemark });
  createPostsPages({
    createPage,
    results: {
      ...allMarkdownRemarkResults.data.allMarkdownRemark,
      defaultThumbnail: defaultThumbnailResults.data.file,
    },
  });
};
