import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Avatar, Container, IconButton, Tooltip, Typography } from '@material-ui/core';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

import { SteamSymbolIcon } from '../FontAwesomeIcons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        textAlign: 'center',
      },
    },
    avatar: {
      margin: theme.spacing(1),
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    name: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const classes = useStyles();
  const result = useStaticQuery<GatsbyTypes.ProfileQuery>(query);
  const { name, summary, avatar, social } = result?.site?.siteMetadata?.author ?? {};

  return (
    <Container component="footer" maxWidth="md" classes={{ root: classes.root }}>
      <Avatar alt={name ?? ''} src={avatar ?? ''} classes={{ root: classes.avatar }} />
      <div className={classes.name}>
        <Typography component="p" variant="subtitle1">
          {name}
        </Typography>
        <Typography component="p" variant="caption">
          {summary}
        </Typography>
      </div>
      <address className={classes.flex}>
        <Tooltip title="Twitter" placement="bottom">
          <IconButton aria-label="twitter" href={`https://twitter.com/${social?.twitter}`}>
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub" placement="bottom">
          <IconButton aria-label="github" href={`https://github.com/${social?.github}`}>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Steam" placement="bottom">
          <IconButton aria-label="steam" href={`https://steamcommunity.com/id/${social?.steam}/`}>
            <SteamSymbolIcon />
          </IconButton>
        </Tooltip>
      </address>
    </Container>
  );
};

export const query = graphql`
  query Profile {
    site {
      siteMetadata {
        author {
          name
          summary
          avatar
          social {
            twitter
            github
            steam
          }
        }
      }
    }
  }
`;
