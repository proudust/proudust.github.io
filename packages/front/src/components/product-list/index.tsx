import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  GetApp as GetAppIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 200,
    },
  }),
);

interface ProductListProps {
  children?: never;
  limit?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ limit }) => {
  const classes = useStyles();
  const data = useStaticQuery<GatsbyTypes.ProductListQuery>(query);
  limit ??= Number.MAX_VALUE;
  const products = (data.profileYaml?.products ?? []).slice(0, limit);

  return (
    <Grid container spacing={2}>
      {products.map((node, index) => (
        <Grid item sm={6} xs={12} key={index}>
          <Card>
            <CardActionArea href={node?.links?.[0]?.href ?? ''}>
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
            </CardActionArea>
            <CardActions>
              {node?.links?.map((link, index) => (
                <Tooltip title={link?.name ?? ''} aria-label={link?.name ?? ''} key={index}>
                  <IconButton href={link?.href ?? ''}>
                    {
                      ({
                        Download: <GetAppIcon />,
                        GitHub: <GitHubIcon />,
                        Link: <LaunchIcon />,
                      } as { [key: string]: React.ReactNode | undefined })[link?.name ?? '']
                    }
                  </IconButton>
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
