import React from 'react';

import { usePostData } from './usePostData';
import { PostCard } from './PostCard';

interface PostListProps {
  children?: never;
  limit: number;
}

export const PostList: React.FC<PostListProps> = props => {
  const posts = usePostData().slice(0, props.limit === 0 ? Number.MAX_VALUE : props.limit);

  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {posts.map((post, index) => (
        <li key={index}>
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
};
