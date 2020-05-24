import React from 'react';
import { Drawer, Typography, Paper, IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Toc as TocIcon } from '@material-ui/icons';
import { graphql, PageRendererProps } from 'gatsby';
import 'prismjs/themes/prism-tomorrow.css';

import { Layout } from '../components/layout';
import type { BlogPostBySlugQuery } from '../../types/query';

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
    header: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    nav: {
      width: 300,
      '& ul': {
        listStyle: 'none',
        margin: 0,
        paddingLeft: theme.spacing(2),
      },
      '& li': {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
      },
      '& > ul > li': {
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.divider,
        borderLeftWidth: 2,
      },
      '& ul ul li:last-child': {
        paddingBottom: 0,
      },
      '& a': {
        color: theme.palette.text.secondary,
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
      },
      '& a:hover': {
        color: theme.palette.text.primary,
      },
      '& p': {
        margin: 0,
        paddingBottom: theme.spacing(1),
      },
    },
    content: {
      '& a': {
        color: theme.palette.secondary.main,
      },
      '& a:hover': {
        color: theme.palette.secondary.light,
      },
      '& h2': {
        marginTop: theme.spacing(8),
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
      },
      '& th': {
        ...theme.typography.body2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        padding: theme.spacing(1),
      },
      '& td': {
        ...theme.typography.body2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        padding: theme.spacing(1),
      },
    },
  }),
);

interface BlogPostProps extends PageRendererProps {
  children?: never;
  data: BlogPostBySlugQuery;
}

const BlogPost: React.FC<BlogPostProps> = props => {
  const classes = useStyles();
  const [openNav, setOpenNav] = React.useState(false);
  const post = props.data?.markdownRemark;
  if (!post) throw Error('post is not found.');

  return (
    <Layout
      backref="/"
      title={post.frontmatter?.title ?? ''}
      actions={
        <IconButton onClick={() => setOpenNav(true)}>
          <TocIcon />
        </IconButton>
      }
    >
      <Paper component="article" className={classes.paper}>
        <header className={classes.header}>
          <Typography variant="h1" style={{ fontSize: '2.5rem' }}>
            {post.frontmatter?.title}
          </Typography>
          <Typography variant="subtitle1">{post.frontmatter?.createat}</Typography>
        </header>
        <Typography
          className={classes.content}
          component="div"
          variant="body1"
          dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
        />
      </Paper>
      <Drawer anchor="right" open={openNav} onClose={() => setOpenNav(false)}>
        <Typography component="h6" style={{ padding: 16 }}>
          目次
        </Typography>
        <Typography
          className={classes.nav}
          component="div"
          variant="subtitle1"
          onClick={() => setOpenNav(false)}
          dangerouslySetInnerHTML={{ __html: post.tableOfContents ?? '' }}
        />
      </Drawer>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents(absolute: false)
      frontmatter {
        title
        createat(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
