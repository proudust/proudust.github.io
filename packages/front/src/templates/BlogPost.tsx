import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { graphql, PageRendererProps } from 'gatsby';
import 'prismjs/themes/prism-tomorrow.css';

import { Layout } from '../components/layout';
import type { BlogPostBySlugQuery } from '../../types/query';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    content: {
      padding: theme.spacing(3),
      '& a': {
        color: theme.palette.secondary.light,
      },
      '& h2': {
        marginTop: theme.spacing(6),
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
  const post = props.data?.markdownRemark;
  if (!post) throw Error('post is not found.');

  return (
    <Layout backref="/" title={post.frontmatter?.title ?? ''}>
      <Paper className={classes.content}>
        <Typography variant="subtitle1">{post.frontmatter?.createat}</Typography>
        <Typography variant="h4">{post.frontmatter?.title}</Typography>
        <Typography
          component="div"
          variant="body1"
          dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
        />
      </Paper>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        createat(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
