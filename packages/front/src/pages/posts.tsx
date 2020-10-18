import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { PostList } from '../components/post';

import type { PageProps } from 'gatsby';

type PostListProps = PageProps<GatsbyTypes.PostsQuery, GatsbyTypes.PostsQueryVariables>;

export const Posts: React.FC<PostListProps> = ({ data }) => (
  <Layout title="投稿" backref="/">
    <section>
      <PostList posts={data.allMarkdownRemark.nodes} />
    </section>
  </Layout>
);

export default Posts;

export const pageQuery = graphql`
  query Posts {
    allMarkdownRemark(sort: { fields: fields___createat, order: DESC }) {
      nodes {
        excerpt
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
`;
