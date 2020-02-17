import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { PostCard } from './PostCard';
import { PostListQuery } from '../../types/query';

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
    const qiita = data.allQiitaPost?.edges.map(
      ({ node }) =>
        ({
          type: 'qiita',
          title: node.title ?? '',
          excerpt:
            (node.body?.length ?? 0) > 140 ? node.body?.slice(0, 140) + '...' : node.body ?? '',
          createat: node.created_at ?? '',
          thumbnail: '',
          url: node.url ?? '',
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
    return [...selfposts, ...qiita, ...guides]
      .sort((a, b) => Date.parse(b.createat) - Date.parse(a.createat))
      .slice(0, props.limit === 0 ? Number.MAX_VALUE : props.limit);
  })();

  return (
    <ul style={{ padding: 0 }}>
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
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
    profileYaml {
      products {
        title
        description
        image {
          childImageSharp {
            fluid(maxHeight: 200) {
              src
            }
          }
        }
        links {
          name
          href
        }
      }
    }
  }
`;
