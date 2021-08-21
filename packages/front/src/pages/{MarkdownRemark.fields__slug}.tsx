import React from 'react';
import { IconButton, Paper, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { Toc as TocIcon } from '@material-ui/icons';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { Article } from '../components/post/Article';
import { ViewOnGithubButton } from '../components/post/ViewOnGithubButton';
import { Toc } from '../components/post/Toc';

import type { PageProps } from 'gatsby';

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      maxWidth: 800,
    },
    header: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  }),
);

interface TocButtonProps {
  children?: never;
  visible: boolean;
  onClick: () => void;
}

const TocButton: React.FC<TocButtonProps> = ({ visible, onClick }) => {
  if (!visible) return <></>;

  return (
    <Tooltip title="目次を表示" placement="bottom">
      <IconButton onClick={onClick}>
        <TocIcon />
      </IconButton>
    </Tooltip>
  );
};

type BlogPostProps = PageProps<
  GatsbyTypes.BlogPostBySlugQuery,
  GatsbyTypes.BlogPostBySlugQueryVariables
>;

const BlogPost: React.FC<BlogPostProps> = props => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [openNav, setOpenNav] = React.useState(false);

  const post = props.data?.markdownRemark;
  if (!post) throw Error('post is not found.');

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
      <Paper component="article" className={classes.paper}>
        <header className={classes.header}>
          <Typography variant="h1" style={{ fontSize: '2.5rem' }}>
            {post.frontmatter?.title}
          </Typography>
          <Typography
            component="time"
            property="schema:datePublished"
            dateTime={post.frontmatter?.createatRaw ?? post.fields?.createatRaw}
            variant="subtitle1"
          >
            {post.frontmatter?.createat ?? post.fields?.createat}
          </Typography>
        </header>
        <Article html={post.html} />
      </Paper>
      <Toc
        mode={matches ? 'side' : 'drawer'}
        tableOfContents={post.tableOfContents}
        isOpen={openNav}
        close={() => setOpenNav(false)}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String) {
    markdownRemark(id: { eq: $id }) {
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
