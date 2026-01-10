const createSchemaCustomization = ({ actions }) => {
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

    type VisitorStats implements Node {
      today: Int
      total: Int
      lastUpdated: Date @dateformat
      source: String
    }
  `);
};

module.exports = {
  createSchemaCustomization,
};
