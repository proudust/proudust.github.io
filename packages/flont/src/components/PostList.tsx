import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { PostCard } from './PostCard';
import type { PostListQuery } from '../../types/query';

interface PostListProps {
  children?: never;
  limit: number;
}

export const PostList: React.FC<PostListProps> = props => {
  const data = useStaticQuery<PostListQuery>(query);

  const posts = (() => {
    return data.allMarkdownRemark?.edges
      .map(({ node }) => {
        const type = node.frontmatter?.steam ? 'steam-guide' : 'inside';
        const title = node.frontmatter?.title ?? '';
        const createat = node.frontmatter?.createat ?? '';
        const thumbnail = node.frontmatter?.thumbnail?.childImageSharp?.fluid?.src ?? '';
        const excerpt = node.excerpt ?? '';
        const url =
          {
            inside: node.fields?.slug,
            'steam-guide': node.frontmatter?.steam,
          }[type] ?? '';
        return { type, title, excerpt, createat, thumbnail, url } as const;
      })
      .sort((a, b) => Date.parse(b.createat) - Date.parse(a.createat))
      .slice(0, props.limit === 0 ? Number.MAX_VALUE : props.limit);
  })();

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

export default PostList;

const query = graphql`
  query PostList {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            createat
            thumbnail {
              childImageSharp {
                fluid(maxHeight: 200) {
                  src
                }
              }
            }
            steam
          }
        }
      }
    }
  }
`;
