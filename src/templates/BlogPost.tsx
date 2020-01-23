import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { graphql, PageRendererProps } from 'gatsby';

import { Layout } from '../components/Layout';
import { BlogPostBySlugQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    content: {
      padding: theme.spacing(3),
      '& th': {
        ...theme.typography.body2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: 8,
      },
      '& td': {
        ...theme.typography.body2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: 8,
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
  const { frontmatter, html } = props.data?.markdownRemark ?? {};

  return (
    <Layout backref="/">
      <Paper className={classes.content}>
        <Typography variant="subtitle1">{frontmatter?.createat}</Typography>
        <Typography variant="h4">{frontmatter?.title}</Typography>
        <Typography dangerouslySetInnerHTML={{ __html: html ?? '' }} />
      </Paper>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        createat(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
