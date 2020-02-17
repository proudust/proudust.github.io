import React from 'react';

import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';

interface PostListProps {
  children?: never;
}

export const Posts: React.FC<PostListProps> = () => (
  <Layout title="投稿" backref="/">
    <section>
      <PostList limit={0} />
    </section>
  </Layout>
);

export default Posts;
