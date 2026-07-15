import React from 'react';

import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';
import { MdToc } from 'react-icons/md';

import { Layout } from '../components/layout';
import { Article } from '../components/post/Article';
import { Toc } from '../components/post/Toc';
import { ViewOnGithubButton } from '../components/post/ViewOnGithubButton';
import { IconButton, Paper, Tooltip, Typography } from '../components/ui';

import NotFound from './404';

interface TocButtonProps {
  children?: never;
  onClick: () => void;
}

const TocButton: React.FC<TocButtonProps> = ({ onClick }) => (
  <span className="lg:hidden">
    <Tooltip title="目次を表示" placement="bottom">
      <IconButton onClick={onClick} size="large">
        <MdToc />
      </IconButton>
    </Tooltip>
  </span>
);

type BlogPostProps = PageProps<Queries.BlogPostBySlugQuery, Queries.BlogPostBySlugQueryVariables>;

const BlogPost: React.FC<BlogPostProps> = props => {
  const [openNav, setOpenNav] = React.useState(false);

  const post = props.data?.markdownRemark;
  if (!post) return <NotFound />;

  return (
    <Layout
      backref="/"
      title={post.frontmatter?.title ?? ''}
      mainClassName="lg:flex lg:items-start lg:max-w-[1152px]"
      actions={
        <>
          <ViewOnGithubButton slug={post.fields?.slug ?? ''} />
          <TocButton onClick={() => setOpenNav(true)} />
        </>
      }
    >
      <Paper component="article" className="p-6 w-full max-w-[800px] lg:min-w-0 lg:flex-1">
        <header className="flex flex-col-reverse">
          <Typography variant="h1" style={{ fontSize: '2.5rem' }}>
            {post.frontmatter?.title}
          </Typography>
          <Typography
            component="time"
            property="schema:datePublished"
            dateTime={post.frontmatter?.createatRaw ?? post.fields?.createatRaw ?? undefined}
            variant="subtitle1"
          >
            {post.frontmatter?.createat ?? post.fields?.createat}
          </Typography>
        </header>
        <Article html={post.html || undefined} />
      </Paper>
      <Toc
        tableOfContents={post.tableOfContents || undefined}
        isOpen={openNav}
        close={() => setOpenNav(false)}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String) {
    markdownRemark(id: { eq: $id }, fields: { slug: { ne: null } }) {
      id
      html
      tableOfContents(absolute: false)
      fields {
        slug
        createat(formatString: "YYYY/MM/DD")
        createatRaw: createat
      }
      frontmatter {
        title
        createat(formatString: "YYYY/MM/DD")
        createatRaw: createat
      }
    }
  }
`;
