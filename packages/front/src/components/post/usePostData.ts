import { graphql, useStaticQuery } from 'gatsby';

interface PostData {
  type: 'inside' | 'steam-guide';
  title: string;
  excerpt: string;
  createat: string;
  tags: string[];
  url: string;
}

const NonNull = <T>(x: T | null | undefined): x is T => !!x;

export function usePostData(): PostData[] {
  const result = useStaticQuery<GatsbyTypes.UsePostDataQuery>(query);

  const selfposts: PostData[] = result.allMarkdownRemark?.nodes.map(node => ({
    type: node.frontmatter?.source ?? 'inside',
    title: node.frontmatter?.title ?? '',
    excerpt: node.excerpt ?? '',
    createat: node.frontmatter?.createat ?? node.fields?.createat ?? '',
    tags: (node.frontmatter?.tags ?? node.frontmatter?.topics)?.filter(NonNull) ?? [],
    url: node.fields?.slug ?? '',
  }));

  const guides: PostData[] = result.allSteamGuidesYaml?.nodes.map(
    node =>
      ({
        type: 'steam-guide',
        title: node.title ?? '',
        excerpt: node.excerpt ?? '',
        createat: node.createat ?? '',
        tags: ['Steam'] as string[],
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
          source
          createat
        }
        frontmatter {
          title
          tags
          topics
          createat
        }
      }
    }
    allSteamGuidesYaml {
      nodes {
        title
        createat
        excerpt
        url
      }
    }
  }
`;
