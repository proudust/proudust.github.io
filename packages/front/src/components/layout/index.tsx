import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Divider } from '../ui';

import { DefaultAppBar } from './AppBar';
import { Profile } from './Profile';

interface LayoutProps {
  children: NonNullable<React.ReactNode>;
  title?: string;
  backref?: string;
  actions?: React.ReactNode;
  mainClassName?: string;
}

export const Layout: React.FC<LayoutProps> = props => {
  const { site } = useStaticQuery<Queries.LayoutQuery>(query);
  const siteTitle = site?.siteMetadata?.title ?? '';
  const title = props.title ? `${props.title} - ${siteTitle}` : siteTitle;

  const mainClassName = [
    'mx-auto px-6 max-w-[864px] mt-[var(--spacing-app-bar)] mb-6',
    props.mainClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DefaultAppBar title={title} backref={props.backref} actions={props.actions} />
      <main className={mainClassName}>{props.children}</main>
      <Divider />
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
