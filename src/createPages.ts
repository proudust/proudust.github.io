import path from 'path';
import { GatsbyNode } from 'gatsby';

interface Restlt {
  allMarkdownRemark: {
    edges: {
      id: number;
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
        };
      };
    }[];
  };
}

const query = `
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

  const result = await graphql<Restlt>(query);
  if (result.errors) throw result.errors;

  const template = path.resolve(`src/templates/BlogPost.tsx`);
  const posts = result.data?.allMarkdownRemark.edges ?? [];
  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: template,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
};
