import React from 'react';

import { ArrowForward as MuiArrowForwardIcon } from '@mui/icons-material';
import type { ButtonProps } from '@mui/material';
import { Button, Typography } from '@mui/material';
import styled from '@mui/styled-engine';
import { graphql, Link } from 'gatsby';
import type { PageProps } from 'gatsby';

import { Layout } from '../components/layout';
import { PostList } from '../components/post';
import { ProductList } from '../components/product-list';

const LinkButtonStyleLess: React.FC<ButtonProps<typeof Link>> = props => (
  <Button component={Link} {...props} />
);

const LinkButton = styled(LinkButtonStyleLess)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1, 0),
}));

const ArrowForwardIcon = styled(MuiArrowForwardIcon)(({ theme }) => ({
  margin: theme.spacing(1),
}));

interface SectionHeaderProps {
  children: string;
  href: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = props => (
  <LinkButton to={props.href}>
    <Typography component="h2" variant="h5" color="textPrimary">
      {props.children}
    </Typography>
    <ArrowForwardIcon />
  </LinkButton>
);

type IndexProps = PageProps<Queries.IndexQuery, Queries.IndexQueryVariables>;

export const Index: React.FC<IndexProps> = ({ data }) => (
  <Layout>
    <section>
      <SectionHeader href="/posts">投稿</SectionHeader>
      <PostList posts={data.allMarkdownRemark.nodes} />
    </section>
    <section>
      <SectionHeader href="/products">制作物</SectionHeader>
      <ProductList products={data.allProduct?.nodes} />
    </section>
  </Layout>
);

export default Index;

export const pageQuery = graphql`
  query Index {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: { createat: DESC } }
      limit: 5
    ) {
      nodes {
        ...PostList
      }
    }
    allProduct(
      limit: 4
      filter: { title: { regex: "/((DDLC|MAS|Dweller's Empty Path) 日本語化|OneShot)/" } }
    ) {
      nodes {
        ...ProductList
      }
    }
  }
`;
