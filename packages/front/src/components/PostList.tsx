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
    const thumbnails = new Map(
      data.allFile.edges.map(({ node }) => [node.name, node.childImageSharp?.fluid?.src]),
    );
    const selfposts = data.allMarkdownRemark?.edges.map(
      ({ node }) =>
        ({
          type: 'inside',
          title: node.frontmatter?.title ?? '',
          excerpt: node.excerpt ?? '',
          createat: node.frontmatter?.createat ?? '',
          thumbnail:
            node.frontmatter?.thumbnail?.childImageSharp?.fluid?.src ??
            thumbnails.get(node.frontmatter?.tags?.[0] ?? '') ??
            '',
          url: node.fields?.slug ?? '',
        } as const),
    );
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
    return [...selfposts, ...guides]
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
            tags
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
    allSteamGuidesYaml {
      nodes {
        title
        createat
        excerpt
        url
        thumbnail
      }
    }
    allFile(filter: { relativePath: { glob: "thumbnail/**" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxHeight: 200) {
              src
            }
          }
        }
      }
    }
  }
`;
