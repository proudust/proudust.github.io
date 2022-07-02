import React from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '@mui/material/styles';
import { Container, Divider } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';

import { DefaultAppBar } from './AppBar';
import { Profile } from './Profile';

interface LayoutProps {
  children: NonNullable<React.ReactNode>;
  title?: string;
  backref?: string;
  actions?: React.ReactNode;
  flex?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export const Layout: React.FC<LayoutProps> = props => {
  const theme = useTheme();
  const flexStyle = props.flex ? { display: 'flex', alignItems: 'flex-start' } : {};

  const { site } = useStaticQuery<Queries.LayoutQuery>(query);
  const siteTitle = site?.siteMetadata?.title ?? '';
  const title = props.title ? `${props.title} - ${siteTitle}` : siteTitle;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DefaultAppBar title={title} backref={props.backref} actions={props.actions} />
      <Container
        component="main"
        maxWidth={props.width || 'md'}
        style={{ marginTop: theme.spacing(9), ...flexStyle }}
      >
        {props.children}
      </Container>
      <Divider style={{ marginTop: theme.spacing(3) }} />
      <Profile />
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
