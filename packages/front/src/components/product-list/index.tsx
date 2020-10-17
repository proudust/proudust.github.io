import React from 'react';
import { Grid } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  children?: never;
  limit?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ limit }) => {
  const data = useStaticQuery<GatsbyTypes.ProductListQuery>(query);
  limit ??= Number.MAX_VALUE;
  const products = (data.profileYaml?.products ?? []).slice(0, limit);

  return (
    <Grid component="ul" container spacing={2} style={{ listStyle: 'none', padding: 0 }}>
      {products.map((node, index) => (
        <Grid component="li" item sm={6} xs={12} key={index}>
          <ProductListItem
            title={node?.title}
            description={node?.description}
            image={node?.image?.childImageSharp?.fluid?.src}
            links={node?.links}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const query = graphql`
  query ProductList {
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
