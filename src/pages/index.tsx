import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';
import { CardActionAreaLink } from '../components/SmartLink';
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
  const products = data.profileYaml?.products ?? [];

  return (
    <Layout>
      <section>
        <Typography variant="h5" className={classes.header}>
          投稿
        </Typography>
        <PostList limit={5} />
      </section>
      <section>
        <Typography variant="h5" className={classes.header}>
          作ったもの
        </Typography>
        <Grid container spacing={2}>
          {products.map((node, index) => (
            <Grid item sm={6} xs={12} key={index}>
              <Card>
                <CardActionAreaLink href={node?.links?.[0]?.href ?? ''}>
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
                </CardActionAreaLink>
                <CardActions>
                  {node?.links?.map((link, index) => (
                    <Button
                      size="small"
                      color="primary"
                      component="a"
                      href={link?.href ?? ''}
                      key={index}
                    >
                      {link?.name ?? ''}
                    </Button>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Layout>
  );
};

export default Index;

const query = graphql`
  query Index {
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
