import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import striptags from 'striptags';

import { PostCard } from './PostCard';
import type { PostListQuery } from '../../types/query';

interface PostListProps {
  children?: never;
  limit: number;
}

export const PostList: React.FC<PostListProps> = props => {
  const data = useStaticQuery<PostListQuery>(query);

  const posts = (() => {
    const selfposts = data.allMarkdownRemark?.edges.map(
      ({ node }) =>
        ({
          type: 'inside',
          title: node.frontmatter?.title ?? '',
          excerpt: node.excerpt ?? '',
          createat: node.frontmatter?.createat ?? '',
          thumbnail: node.frontmatter?.thumbnail?.childImageSharp?.fluid?.src ?? '',
          url: node.fields?.slug ?? '',
        } as const),
    );
    const qiita = data.allQiitaPost?.edges.map(({ node }) => {
      const body = striptags(node.rendered_body ?? '').replace(/\r?\n/g, ' ');
      return {
        type: 'qiita',
        title: node.title ?? '',
        excerpt: (body.length ?? 0) > 140 ? body.slice(0, 140) + '...' : body ?? '',
        createat: node.created_at ?? '',
        thumbnail:
          node.body?.match(/!\[[^\]]+\]\(([^)]+)\)/)?.[1] ??
          data.file?.childImageSharp?.fixed?.src ??
          '',
        url: node.url ?? '',
      } as const;
    });
    const guides = data.allSteamGuidesYaml?.nodes.map(
      node =>
        ({
          type: 'steam-guide',
          title: node.title ?? '',
          excerpt: node.excerpt ?? '',
          createat: node.createat ?? '',
          thumbnail: node.thumbnail ?? '',
          url: node.url ?? '',
        } as const),
    );
    return [...selfposts, ...qiita, ...guides]
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
          }
        }
      }
    }
    allQiitaPost {
      edges {
        node {
          title
          rendered_body
          body
          created_at
          url
        }
      }
    }
    allSteamGuidesYaml {
      nodes {
        title
        createat
        excerpt
        url
        thumbnail
      }
    }
  }
`;
