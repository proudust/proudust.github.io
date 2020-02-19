import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, Grid, Tooltip } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  GetApp as GetAppIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

import { CardActionAreaLink, IconLink } from './Link';
import { ProductListQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

interface ProductListProps {
  children?: never;
}

export const ProductList: React.FC<ProductListProps> = () => {
  const classes = useStyles();
  const data = useStaticQuery<ProductListQuery>(query);
  const products = data.profileYaml?.products ?? [];

  return (
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
              <CardHeader
                title={node?.title}
                titleTypographyProps={{ variant: 'h6' }}
                subheader={node?.description}
                subheaderTypographyProps={{ variant: 'body2' }}
              />
            </CardActionAreaLink>
            <CardActions>
              {node?.links?.map((link, index) => (
                <Tooltip title={link?.name} aria-label={link?.name ?? ''} key={index}>
                  <div>
                    <IconLink href={link?.href ?? ''}>
                      {
                        ({
                          Download: <GetAppIcon />,
                          GitHub: <GitHubIcon />,
                          Link: <LaunchIcon />,
                        } as { [key: string]: React.ReactNode | undefined })[link?.name ?? '']
                      }
                    </IconLink>
                  </div>
                </Tooltip>
              ))}
            </CardActions>
          </Card>
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
