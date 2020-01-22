import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { LayoutQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { site } = useStaticQuery<LayoutQuery>(query);
  const title = props.title ?? site?.siteMetadata?.title;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ padding: theme.spacing(3) }}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{props.children}</Container>
      </main>
    </>
  );
};

export const query = graphql`
  query Layout {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
