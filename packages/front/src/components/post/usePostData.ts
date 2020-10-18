import { graphql, useStaticQuery } from 'gatsby';

interface PostData {
  type: 'inside' | 'steam-guide' | 'zenn';
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
    type: node.fields?.sourceFileType !== 'zenn' ? 'inside' : 'zenn',
    title: node.frontmatter?.title ?? '',
    excerpt: node.excerpt ?? '',
    createat: node.fields?.createat ?? '',
    tags: (node.frontmatter?.tags ?? node.frontmatter?.topics)?.filter(NonNull) ?? [],
    url: node.frontmatter?.steam ?? node.fields?.zenn ?? node.fields?.slug ?? '',
  }));

  return selfposts;
}

const query = graphql`
  query UsePostData {
    allMarkdownRemark(sort: { fields: fields___createat, order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          sourceFileType
          zenn
          createat
        }
        frontmatter {
          title
          tags
          topics
          steam
        }
      }
    }
  }
`;
