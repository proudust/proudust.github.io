require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2018',
  },
});

exports.onCreateNode = require('./src/onCreateNode').onCreateNode;
exports.createPages = require('./src/createPages').createPages;
