const path = require('path');

/** @type import('gatsby').GatsbyConfig */
module.exports = {
  siteMetadata: {
    title: 'proudust.github.io',
    siteUrl: 'https://proudust.github.io',
    repo: 'https://github.com/proudust/proudust.github.io',
    author: {
      name: 'Proudust',
      summary: 'Virtual cockadoodledoo',
      avatar: 'https://secure.gravatar.com/avatar/7c5f546f80eeb2c158c8699d2f8bbc4f',
      social: {
        twitter: `proudust`,
        github: 'proudust',
        steam: 'proudust',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, '..', 'posts'),
        ignore: ['**/.*'],
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `zenn`,
        remote: `https://github.com/proudust/zenn-contents.git`,
        branch: `master`,
        patterns: `articles/**`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: { offsetY: 100 },
          },
          'gatsby-remark-images',
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-plugin-layout',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typegen',
    {
      resolve: 'gatsby-plugin-catch-links',
      options: {
        excludePattern: /^\/payday2-bigoil\/$/,
      },
    },
    'gatsby-plugin-material-ui',
  ],
};
