import React from 'react';

import { Layout } from '../components/layout';
import { PostList } from '../components/post';

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
