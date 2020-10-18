import React from 'react';
import { Grid } from '@material-ui/core';
import { graphql } from 'gatsby';

import { ProductListItem } from './ProductListItem';

function nonNull<T>(x: T | undefined): x is T {
  return Boolean(x);
}

interface ProductListProps {
  children?: never;
  products: GatsbyTypes.ProductListFragment['products'];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <Grid component="ul" container spacing={2} style={{ listStyle: 'none', padding: 0 }}>
    {products?.map((node, index) => (
      <Grid component="li" item sm={6} xs={12} key={index}>
        <ProductListItem
          title={node?.title}
          description={node?.description}
          image={node?.image?.childImageSharp?.fluid?.src}
          links={node?.links?.filter(nonNull)}
        />
      </Grid>
    ))}
  </Grid>
);

export const query = graphql`
  fragment ProductList on ProfileYaml {
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
`;
