import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { ProductList } from '../components/product-list';

import type { PageProps } from 'gatsby';

type ProductsProps = PageProps<GatsbyTypes.ProductsQuery, GatsbyTypes.ProductsQueryVariables>;

export const Products: React.FC<ProductsProps> = ({ data }) => (
  <Layout title="制作物" backref="/">
    <section>
      <ProductList products={data.profileYaml?.products} />
    </section>
  </Layout>
);

export default Products;

export const pageQuery = graphql`
  query Products {
    profileYaml {
      products {
        title
        description
        image {
          childImageSharp {
            fluid(maxHeight: 200) {
              src
            }
          }
        }
        links {
          name
          href
        }
      }
    }
  }
`;
