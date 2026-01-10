require('dotenv').config();

const { createSchemaCustomization } = require('./gatsby-node/schema');
const { sourceNodes } = require('./gatsby-node/source-nodes');
const { onCreateNode, createPages } = require('./gatsby-node/markdown-pages');

exports.onCreateNode = onCreateNode;
exports.createSchemaCustomization = createSchemaCustomization;
exports.sourceNodes = sourceNodes;
exports.createPages = createPages;
