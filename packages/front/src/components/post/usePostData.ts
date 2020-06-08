import { graphql, useStaticQuery } from 'gatsby';
import type { UsePostDataQuery } from '../../../types/query';

interface PostData {
  type: 'inside' | 'steam-guide';
  title: string;
  excerpt: string;
  createat: string;
  thumbnail: string;
  url: string;
}

export function usePostData(): PostData[] {
  const result = useStaticQuery<UsePostDataQuery>(query);
  const thumbnails = new Map(
    result.allFile.nodes.map(node => [node.name, node.childImageSharp?.fluid?.src]),
  );

  const selfposts: PostData[] = result.allMarkdownRemark?.nodes.map(node => ({
    type: 'inside',
    title: node.frontmatter?.title ?? '',
    excerpt: node.excerpt ?? '',
    createat: node.frontmatter?.createat ?? '',
    thumbnail:
      node.frontmatter?.thumbnail?.childImageSharp?.fluid?.src ??
      thumbnails.get(node.frontmatter?.tags?.[0] ?? '') ??
      '',
    url: node.fields?.slug ?? '',
  }));

  const guides: PostData[] = result.allSteamGuidesYaml?.nodes.map(
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

  return [...selfposts, ...guides].sort((a, b) => Date.parse(b.createat) - Date.parse(a.createat));
}

const query = graphql`
  query UsePostData {
    allMarkdownRemark {
      nodes {
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
      nodes {
        name
        childImageSharp {
          fluid(maxHeight: 200) {
            src
          }
        }
      }
    }
  }
`;
