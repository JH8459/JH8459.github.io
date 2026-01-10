const crypto = require('crypto');
const { fetchVisitorStats } = require('./ga4');

const sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;
  const stats = await fetchVisitorStats(reporter);
  const nodeData = {
    ...stats,
    lastUpdated: new Date().toISOString(),
  };
  createNode({
    ...nodeData,
    id: createNodeId('visitor-stats'),
    parent: null,
    children: [],
    internal: {
      type: 'VisitorStats',
      contentDigest: crypto.createHash('md5').update(JSON.stringify(nodeData)).digest('hex'),
    },
  });
};

module.exports = {
  sourceNodes,
};
