import React from 'react';
import { Grid } from '@material-ui/core';

import { ProductListItem } from './ProductListItem';

interface ProductLink {
  name?: string;
  href?: string;
}

interface Product {
  title?: string;
  description?: string;
  image?: { childImageSharp?: { fluid?: { src?: string } } };
  links?: readonly (ProductLink | undefined)[];
}

interface ProductListProps {
  children?: never;
  products: readonly (Product | undefined)[] | undefined;
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <Grid component="ul" container spacing={2} style={{ listStyle: 'none', padding: 0 }}>
    {products?.map((node, index) => (
      <Grid component="li" item sm={6} xs={12} key={index}>
        <ProductListItem
          title={node?.title}
          description={node?.description}
          image={node?.image?.childImageSharp?.fluid?.src}
          links={node?.links?.filter(Boolean) as ProductLink[]}
        />
      </Grid>
    ))}
  </Grid>
);
