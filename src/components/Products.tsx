import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { ProuductsQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

interface ProductsProps {
  children?: never;
}

export const Products: React.FC<ProductsProps> = () => {
  const classes = useStyles();
  const data = useStaticQuery<ProuductsQuery>(query);

  return (
    <Grid container spacing={2}>
      {data.allProductsYaml.edges.map(({ node }, index) => (
        <Grid item sm={6} xs={12} key={index}>
          <Card>
            <CardMedia
              className={classes.media}
              image={node.image?.childImageSharp?.fluid?.src ?? ''}
              title={node.title ?? ''}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {node.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {node.description}
              </Typography>
            </CardContent>
            <CardActions>
              {node.links?.map(link => (
                <Button size="small" color="primary" component="a" href={link?.href ?? ''}>
                  {link?.name ?? ''}
                </Button>
              ))}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const query = graphql`
  query Prouducts {
    allProductsYaml {
      edges {
        node {
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
  }
`;
