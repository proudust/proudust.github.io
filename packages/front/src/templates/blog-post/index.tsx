import React from 'react';
import { Helmet } from 'react-helmet';
import { Drawer, IconButton, Paper, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { GitHub as GitHubIcon, Toc as TocIcon } from '@material-ui/icons';
import { graphql } from 'gatsby';
import 'prismjs/themes/prism-tomorrow.css';

import { Layout } from '../../components/layout';
import { ZennIcon } from '../../components/ZennIcon';

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
      '& hr': {
        marginTop: theme.spacing(8),
        borderStyle: 'none',
        backgroundColor: theme.palette.divider,
        height: 1,
      },
      '& .footnotes p': {
        display: 'inline',
      },
    },
  }),
);

interface TocProps {
  children?: never;
  tableOfContents?: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Toc: React.FC<TocProps> = ({ tableOfContents, onClick }) => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h6" style={{ padding: 16 }}>
        目次
      </Typography>
      <Typography
        className={classes.nav}
        component="div"
        variant="subtitle1"
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: tableOfContents ?? '' }}
      />
    </>
  );
};

interface ShowByZennProps {
  children?: never;
  visible: boolean;
  slug: string;
}

const ShowByZennButton: React.FC<ShowByZennProps> = ({ visible, slug }) => {
  if (!visible) return <></>;

  const zennUrl = `https://zenn.dev/proudust/articles${slug.substring(0, slug.length - 1)}`;
  return (
    <>
      <Helmet>
        <link rel="canonical" href={zennUrl} />
      </Helmet>
      <Tooltip title="Zenn で表示" placement="bottom">
        <IconButton component="a" href={zennUrl}>
          <ZennIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

interface ShowByGithubButtonProps {
  children?: never;
  slug: string;
}

const ViewOnGithubButton: React.FC<ShowByGithubButtonProps> = ({ slug }) => (
  <Tooltip title="GitHub で表示" placement="bottom">
    <IconButton
      component="a"
      href={`https://github.com/proudust/proudust.github.io/blob/master-src/packages/posts${slug}index.md`}
    >
      <GitHubIcon />
    </IconButton>
  </Tooltip>
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

interface BlogPostContextType {
  slug: string;
}

type BlogPostProps = PageProps<GatsbyTypes.BlogPostBySlugQuery, BlogPostContextType>;

const BlogPost: React.FC<BlogPostProps> = props => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [openNav, setOpenNav] = React.useState(false);
  const post = props.data?.markdownRemark;
  if (!post) throw Error('post is not found.');

  React.useEffect(() => {
    if (matches) setOpenNav(false);
  }, [matches]);

  return (
    <Layout
      backref="/"
      title={post.frontmatter?.title ?? ''}
      flex={matches}
      width={matches ? 'lg' : undefined}
      actions={
        <>
          <ShowByZennButton
            visible={post.fields?.source === 'zenn'}
            slug={props.pageContext.slug}
          />
          <ViewOnGithubButton slug={props.pageContext.slug} />
          <TocButton visible={!matches} onClick={() => setOpenNav(true)} />
        </>
      }
    >
      <Paper component="article" className={classes.paper}>
        <header className={classes.header}>
          <Typography variant="h1" style={{ fontSize: '2.5rem' }}>
            {post.frontmatter?.title}
          </Typography>
          <Typography variant="subtitle1">
            {post.frontmatter?.createat ?? post.fields?.createat}
          </Typography>
        </header>
        <Typography
          className={classes.content}
          component="div"
          variant="body1"
          dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
        />
      </Paper>
      {matches ? (
        <nav style={{ position: 'sticky', top: theme.spacing(9) }}>
          <Toc onClick={() => setOpenNav(false)} tableOfContents={post.tableOfContents} />
        </nav>
      ) : (
        <Drawer anchor="right" open={openNav} onClose={() => setOpenNav(false)}>
          <nav>
            <Toc onClick={() => setOpenNav(false)} tableOfContents={post.tableOfContents} />
          </nav>
        </Drawer>
      )}
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
      fields {
        source
        createat(formatString: "YYYY/MM/DD")
      }
      frontmatter {
        title
        createat(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
