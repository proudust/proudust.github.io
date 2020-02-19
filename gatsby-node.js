require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
  },
});

const gatsbyNode = require('./src/gatsby-node');

for (const method in gatsbyNode) {
  exports[method] = gatsbyNode[method];
}
