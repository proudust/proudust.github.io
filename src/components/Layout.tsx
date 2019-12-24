import React, { ReactNode } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

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
  const data = useStaticQuery(query);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {props.title ?? data.site.siteMetadata.title}
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
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
