import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { PostList } from '../components/post';

import type { PageProps } from 'gatsby';

type PostListProps = PageProps<Queries.PostsQuery, Queries.PostsQueryVariables>;

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
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: { createat: DESC } }
    ) {
      nodes {
        ...PostList
      }
    }
  }
`;
