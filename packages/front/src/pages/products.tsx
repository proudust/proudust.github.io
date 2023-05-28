import React from 'react';

import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';

import { Layout } from '../components/layout';
import { ProductGrid } from '../components/products/ProductGrid';

type ProductsProps = PageProps<Queries.ProductsQuery, Queries.ProductsQueryVariables>;

export const Products: React.FC<ProductsProps> = ({ data }) => (
  <Layout title="制作物" backref="/">
    <section>
      <ProductGrid products={data.allProduct?.nodes} />
    </section>
  </Layout>
);

export default Products;

export const pageQuery = graphql`
  query Products {
    allProduct {
      nodes {
        ...ProductGrid
      }
    }
  }
`;
