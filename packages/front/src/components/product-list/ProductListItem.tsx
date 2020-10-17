import React from 'react';
import { Card, CardActionArea, CardActions, CardHeader, CardMedia } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ProductLinkButton } from './ProductLinkButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

interface ProductListItemProps {
  children?: never;
  title: string;
  description: string;
  image: string;
  links: {
    name: string;
    href: string;
  }[];
}

export const ProductListItem: React.FC<ProductListItemProps> = props => {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea href={props.links[0].href}>
        <CardMedia className={classes.media} image={props.image} title={props.title} />
        <CardHeader
          title={props.title}
          titleTypographyProps={{ variant: 'h6' }}
          subheader={props.description}
          subheaderTypographyProps={{ variant: 'body2' }}
        />
      </CardActionArea>
      <CardActions>
        {props.links.map((link, index) => (
          <ProductLinkButton key={index} {...link} />
        ))}
      </CardActions>
    </Card>
  );
};
