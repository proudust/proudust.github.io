import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { ProductList } from '../components/product-list';

import type { PageProps } from 'gatsby';

type ProductsProps = PageProps<GatsbyTypes.ProductsQuery, GatsbyTypes.ProductsQueryVariables>;

export const Products: React.FC<ProductsProps> = ({ data }) => (
  <Layout title="制作物" backref="/">
    <section>
      <ProductList products={data.allProduct?.nodes} />
    </section>
  </Layout>
);

export default Products;

export const pageQuery = graphql`
  query Products {
    allProduct {
      nodes {
        ...ProductList
      }
    }
  }
`;
