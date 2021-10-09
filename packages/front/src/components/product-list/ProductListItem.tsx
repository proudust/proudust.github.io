import React from 'react';
import { Card, CardActionArea, CardActions, CardHeader, CardMedia } from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Img from 'gatsby-image';

import { ProductLinkButton } from './ProductLinkButton';

import type { FluidObject } from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

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

export const ProductListItem: React.FC<ProductListItemProps> = props => {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea href={props.links?.[0].href ?? ''}>
        {props.image && <CardMedia component={Img} className={classes.media} fluid={props.image} />}
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
};
