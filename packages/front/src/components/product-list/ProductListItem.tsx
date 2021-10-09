import React from 'react';
import styled from '@mui/styled-engine';
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  CardMediaProps,
} from '@mui/material';
import Img from 'gatsby-image';

import { ProductLinkButton } from './ProductLinkButton';

import type { FluidObject } from 'gatsby-image';

const CardMediaImageStyleLess: React.FC<CardMediaProps<typeof Img>> = props => (
  <CardMedia component={Img} {...props} />
);

const CardMediaImage = styled(CardMediaImageStyleLess)({
  height: 200,
});

interface ProductListItemProps {
  children?: never;
  title?: string;
  description?: string;
  image?: FluidObject | FluidObject[];
  links?: readonly {
    name?: string;
    href?: string;
  }[];
}

export const ProductListItem: React.FC<ProductListItemProps> = props => (
  <Card>
    <CardActionArea href={props.links?.[0].href ?? ''}>
      {props.image && <CardMediaImage fluid={props.image} />}
      <CardHeader
        title={props.title}
        titleTypographyProps={{ component: 'h3', variant: 'h6' }}
        subheader={props.description}
        subheaderTypographyProps={{ component: 'p', variant: 'body2' }}
      />
    </CardActionArea>
    <CardActions>
      {props.links?.map((link, index) => (
        <ProductLinkButton key={index} {...link} />
      ))}
    </CardActions>
  </Card>
);
