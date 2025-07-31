const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
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

const createBlogPages = ({ createPage, results }) => {
  const blogPostTemplate = require.resolve(`./src/templates/blog-template.js`);

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

const createPostsPages = ({ createPage, results }) => {
  const categoryTemplate = require.resolve(`./src/templates/category-template.js`);
  const categorySet = new Set(['All']);
  const { edges } = results;

  edges.forEach(({ node }) => {
    const postCategories = node.frontmatter.categories.split(' ');
    postCategories.forEach(category => categorySet.add(category));
  });

  const categories = [...categorySet];

  createPage({
    path: `/posts`,
    component: categoryTemplate,
    context: { currentCategory: 'All', edges, categories, defaultThumbnail: results.defaultThumbnail },
  });

  categories.forEach(currentCategory => {
    createPage({
      path: `/posts/${currentCategory}`,
      component: categoryTemplate,
      context: {
        currentCategory,
        categories,
        edges: edges.filter(({ node }) =>
          node.frontmatter.categories.includes(currentCategory)
        ),
        defaultThumbnail: results.defaultThumbnail,
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const allMarkdownRemarkResults = await graphql(`
    query AllMarkdownRemark {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 500)
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

  const defaultThumbnailResults = await graphql(`
    query DefaultThumbnail {
      file(relativePath: { eq: "common/NO_IMAGE.png" }) {
        childImageSharp {
          gatsbyImageData(width: 100, height: 100, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `);

  if (allMarkdownRemarkResults.errors || defaultThumbnailResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  createBlogPages({ createPage, results: allMarkdownRemarkResults.data.allMarkdownRemark });
  createPostsPages({ createPage, results: { ...allMarkdownRemarkResults.data.allMarkdownRemark, defaultThumbnail: defaultThumbnailResults.data.file } });
};