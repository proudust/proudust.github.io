import React from 'react';

import type { CardMediaProps } from '@mui/material';
import { Card, CardActionArea, CardActions, CardHeader, CardMedia } from '@mui/material';
import styled from '@mui/styled-engine';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image';

import { ProductLinkButton } from './ProductLinkButton';

type AltGatsbyImageProps = Omit<GatsbyImageProps, 'image'> & { gatsbyImageData: IGatsbyImageData };

const AltGatsbyImage: React.FC<AltGatsbyImageProps> = ({ gatsbyImageData, ...props }) => (
  <GatsbyImage image={gatsbyImageData} {...props} />
);

type CardMediaImageProps = Omit<CardMediaProps, 'image'> & AltGatsbyImageProps;

const CardMediaImage = styled((props: CardMediaImageProps) => (
  <CardMedia component={AltGatsbyImage} {...props} />
))({
  height: 200,
});

interface ProductListItemProps {
  children?: never;
  title?: string;
  description?: string;
  image?: IGatsbyImageData;
  links?: readonly {
    name?: string | null;
    href?: string | null;
  }[];
}

export const ProductListItem: React.FC<ProductListItemProps> = props => (
  <Card>
    <CardActionArea href={props.links?.[0].href ?? ''}>
      {props.image && <CardMediaImage alt={props.title ?? ''} gatsbyImageData={props.image} />}
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
