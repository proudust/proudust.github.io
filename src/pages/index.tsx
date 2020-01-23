import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { graphql, useStaticQuery, Link } from 'gatsby';

import { Layout } from '../components/Layout';
import { IndexQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    media: {
      height: 200,
    },
  }),
);

interface ProfileProps {
  children?: never;
}

export const Index: React.FC<ProfileProps> = () => {
  const classes = useStyles();
  const data = useStaticQuery<IndexQuery>(query);

  const posts = data.allMarkdownRemark?.edges;
  const products = data.profileYaml?.products ?? [];

  return (
    <Layout>
      <Typography variant="h5" className={classes.header}>
        投稿
      </Typography>
      <Grid container spacing={2}>
        {posts.map(({ node }, index) => (
          <Grid item sm={6} xs={12} key={index}>
            <Card>
              <CardActionArea component="div" disableRipple>
                <Link to={node.fields?.slug ?? ''} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    className={classes.media}
                    image={node.frontmatter?.thumbnail?.childImageSharp?.fluid?.src ?? ''}
                    title={node.frontmatter?.title ?? ''}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {node.frontmatter?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {node.excerpt}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" className={classes.header}>
        作ったもの
      </Typography>
      <Grid container spacing={2}>
        {products.map((node, index) => (
          <Grid item sm={6} xs={12} key={index}>
            <Card>
              <CardMedia
                className={classes.media}
                image={node?.image?.childImageSharp?.fluid?.src ?? ''}
                title={node?.title ?? ''}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {node?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {node?.description}
                </Typography>
              </CardContent>
              <CardActions>
                {node?.links?.map(link => (
                  <Button size="small" color="primary" component="a" href={link?.href ?? ''}>
                    {link?.name ?? ''}
                  </Button>
                ))}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;

const query = graphql`
  query Index {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                fluid(maxHeight: 200) {
                  src
                }
              }
            }
          }
        }
      }
    }
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
