const path = require('path');
require('dotenv').config();

/** @type import('gatsby').GatsbyConfig */
module.exports = {
  siteMetadata: {
    title: 'proudust.github.io',
    siteUrl: 'https://proudust.github.io',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: { offsetY: 100, maintainCase: true },
          },
          'gatsby-remark-images',
        ],
      },
    },
    {
      resolve: `gatsby-source-qiita`,
      options: {
        accessToken: process.env.QIITA_ACCESS_TOKEN,
        userName: 'proudust',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: path.join('types', 'query.d.ts'),
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-material-ui',
  ],
};
