import React from 'react';
import styled from '@mui/styled-engine';
import { IconButton, Paper, PaperProps, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Toc as TocIcon } from '@mui/icons-material';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { Article } from '../components/post/Article';
import { ViewOnGithubButton } from '../components/post/ViewOnGithubButton';
import { Toc } from '../components/post/Toc';
import NotFound from './404';

import type { PageProps } from 'gatsby';

const PaperArticleStyleLess: React.FC<PaperProps<'article'>> = props => (
  <Paper component="article" {...props} />
);

const PaperArticle = styled(PaperArticleStyleLess)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 800,
}));

const ArticleHeader = styled('header')({
  display: 'flex',
  flexDirection: 'column-reverse',
});

interface TocButtonProps {
  children?: never;
  visible: boolean;
  onClick: () => void;
}

const TocButton: React.FC<TocButtonProps> = ({ visible, onClick }) => {
  if (!visible) return <></>;

  return (
    <Tooltip title="目次を表示" placement="bottom">
      <IconButton onClick={onClick} size="large">
        <TocIcon />
      </IconButton>
    </Tooltip>
  );
};

type BlogPostProps = PageProps<Queries.BlogPostBySlugQuery, Queries.BlogPostBySlugQueryVariables>;

const BlogPost: React.FC<BlogPostProps> = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [openNav, setOpenNav] = React.useState(false);

  const post = props.data?.markdownRemark;
  if (!post) return <NotFound />;

  return (
    <Layout
      backref="/"
      title={post.frontmatter?.title ?? ''}
      flex={matches}
      width={matches ? 'lg' : undefined}
      actions={
        <>
          <ViewOnGithubButton slug={post.fields?.slug ?? ''} />
          <TocButton visible={!matches} onClick={() => setOpenNav(true)} />
        </>
      }
    >
      <PaperArticle>
        <ArticleHeader>
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
        </ArticleHeader>
        <Article html={post.html || undefined} />
      </PaperArticle>
      <Toc
        mode={matches ? 'side' : 'drawer'}
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
