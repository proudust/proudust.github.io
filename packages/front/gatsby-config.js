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
        name: 'product',
        path: path.join(__dirname, 'content', 'product'),
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
          {
            resolve: 'gatsby-remark-images',
            options: { withWebp: true },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map(node => ({
                date: node.fields.createat,
                title: node.frontmatter.title,
                description: node.excerpt,
                url:
                  node.frontmatter.steam ||
                  node.fields.zenn ||
                  site.siteMetadata.siteUrl + node.fields.slug,
                guid:
                  node.frontmatter.steam ||
                  node.fields.zenn ||
                  site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              })),
            query: `
              {
                allMarkdownRemark(sort: { fields: fields___createat, order: DESC }) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                      sourceFileType
                      zenn
                      createat
                    }
                    frontmatter {
                      title
                      tags
                      topics
                      steam
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'proudust.github.io RSS Feed',
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Product`,
        path: `./content/product/`,
      },
    },
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
