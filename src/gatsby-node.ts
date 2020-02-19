import path from 'path';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { Query } from '../types/query';

// onCreateNode

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// createPages

const createPagesQuery = `
  query BlogPosts {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql<Query>(createPagesQuery);
  if (result.errors) throw result.errors;

  const template = path.resolve(`src/templates/BlogPost.tsx`);
  const posts = result.data?.allMarkdownRemark.edges ?? [];
  posts.forEach(post => {
    const slug = post.node.fields?.slug ?? '';
    createPage({
      path: slug,
      component: template,
      context: {
        slug: slug,
      },
    });
  });
};
