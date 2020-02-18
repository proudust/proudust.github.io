import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { DefaultAppBar } from './AppBar';
import { ApplyTheme } from './ApplyTheme';
import { Profile } from './Profile';
import { LayoutQuery } from '../../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface LayoutProps {
  children: ReactNode;
  title?: string;
  backref?: string;
}

export const Layout: React.FC<LayoutProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { site } = useStaticQuery<LayoutQuery>(query);
  const siteTitle = site?.siteMetadata?.title ?? '';
  const title = props.title ? `${props.title} - ${siteTitle}` : siteTitle;

  return (
    <ApplyTheme>
      <Helmet>
        <html lang="jp" />
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <CssBaseline />
      <DefaultAppBar title={title} backref={props.backref} />
      <div className={classes.toolbar} />
      <Container component="main" maxWidth="md" style={{ marginTop: theme.spacing(3) }}>
        {props.children}
      </Container>
      <hr style={{ marginTop: theme.spacing(3) }} />
      <Container component="footer" maxWidth="md" style={{ marginBottom: theme.spacing(10) }}>
        <Typography variant="h5" className={classes.header}>
          プロフィール
        </Typography>
        <Profile />
      </Container>
    </ApplyTheme>
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
