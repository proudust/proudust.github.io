import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { DefaultAppBar } from './AppBar';
import { Profile } from './Profile';
import type { LayoutQuery } from '../../../types/query';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  backref?: string;
  actions?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = props => {
  const theme = useTheme();

  const { site } = useStaticQuery<LayoutQuery>(query);
  const siteTitle = site?.siteMetadata?.title ?? '';
  const title = props.title ? `${props.title} - ${siteTitle}` : siteTitle;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DefaultAppBar title={title} backref={props.backref} actions={props.actions} />
      <Container component="main" maxWidth="md" style={{ marginTop: theme.spacing(9) }}>
        {props.children}
      </Container>
      <div style={{ marginTop: theme.spacing(3) }}>
        <Divider />
        <Profile />
      </div>
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
