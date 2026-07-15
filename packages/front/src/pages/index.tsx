import React from 'react';

import { graphql, Link } from 'gatsby';
import type { PageProps } from 'gatsby';
import { MdArrowForward } from 'react-icons/md';

import { Layout } from '../components/layout';
import { PostList } from '../components/post';
import { ProductList } from '../components/product-list';
import { Button, Typography } from '../components/ui';

interface SectionHeaderProps {
  children: string;
  href: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = props => (
  <Button component={Link} to={props.href} className="my-2 flex w-full justify-between py-2">
    <Typography component="h2" variant="h5" color="textPrimary">
      {props.children}
    </Typography>
    <MdArrowForward className="m-2" />
  </Button>
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
