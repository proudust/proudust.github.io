import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

import { Layout } from '../components/Layout';
import { QiitaIcon, SteamIcon } from '../components/Icons';
import { ProfileQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    content: {
      padding: theme.spacing(3),
    },
    media: {
      height: 200,
    },
  }),
);

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const classes = useStyles();
  const { profileYaml } = useStaticQuery<ProfileQuery>(query);

  return (
    <Layout>
      <Typography variant="h5" className={classes.header}>
        プロフィール
      </Typography>
      <Card>
        <CardHeader
          avatar={<Avatar alt={profileYaml?.name ?? ''} src={profileYaml?.avatar ?? ''} />}
          title={profileYaml?.name}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {profileYaml?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="twitter" component="a" href={profileYaml?.links?.twitter ?? ''}>
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="github" component="a" href={profileYaml?.links?.github ?? ''}>
            <GitHubIcon />
          </IconButton>
          <IconButton aria-label="qiita" component="a" href={profileYaml?.links?.qiita ?? ''}>
            <QiitaIcon />
          </IconButton>
          <IconButton aria-label="steam" component="a" href={profileYaml?.links?.steam ?? ''}>
            <SteamIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Typography variant="h5" className={classes.header}>
        作ったもの
      </Typography>
      <Grid container spacing={2}>
        {profileYaml?.products?.map((node, index) => (
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

const query = graphql`
  query Profile {
    profileYaml {
      name
      avatar
      description
      links {
        twitter
        github
        qiita
        steam
      }
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
