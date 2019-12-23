import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

interface ProductsCardProps {
  image: string;
  title: string;
  description: string;
}

export const ProductCard: React.FC<ProductsCardProps> = props => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} image={props.image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>{props.children}</CardActions>
    </Card>
  );
};
