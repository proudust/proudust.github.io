import React from 'react';
import { Grid } from '@mui/material';
import { graphql } from 'gatsby';

import { ProductListItem } from './ProductListItem';

import type { FluidObject } from 'gatsby-image';

function nonNull<T>(x: T | null | undefined): x is T {
  return Boolean(x);
}

interface ProductListProps {
  children?: never;
  products: readonly Queries.ProductListFragment[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <Grid component="ul" container spacing={2} style={{ listStyle: 'none', padding: 0 }}>
    {products?.map((node, index) => (
      <Grid component="li" item sm={6} xs={12} key={index}>
        <ProductListItem
          title={node?.title ?? undefined}
          description={node?.description ?? undefined}
          image={(node?.image?.childImageSharp?.fluid as FluidObject) ?? undefined}
          links={node?.links?.filter(nonNull) ?? undefined}
        />
      </Grid>
    ))}
  </Grid>
);

export const query = graphql`
  fragment ProductList on Product {
    title
    description
    image {
      childImageSharp {
        fluid(maxHeight: 200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    links {
      name
      href
    }
  }
`;
