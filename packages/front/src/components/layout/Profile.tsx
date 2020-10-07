import React from 'react';
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Avatar, Container, IconButton, Tooltip, Typography } from '@material-ui/core';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

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
  const { profileYaml } = useStaticQuery<GatsbyTypes.ProfileQuery>(query);
  const { name, avatar, description, links } = profileYaml ?? {};

  return (
    <Container component="footer" maxWidth="md" classes={{ root: classes.root }}>
      <Avatar alt={name ?? ''} src={avatar ?? ''} classes={{ root: classes.avatar }} />
      <div className={classes.name}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="caption">{description}</Typography>
      </div>
      <address className={classes.flex}>
        <Tooltip title="Twitter" placement="bottom">
          <IconButton aria-label="twitter" href={links?.twitter ?? ''}>
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub" placement="bottom">
          <IconButton aria-label="github" href={links?.github ?? ''}>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Steam" placement="bottom">
          <IconButton aria-label="steam" href={links?.steam ?? ''}>
            <FontAwesomeIcon icon={faSteamSymbol} />
          </IconButton>
        </Tooltip>
      </address>
    </Container>
  );
};

export const query = graphql`
  query Profile {
    profileYaml {
      name
      avatar
      description
      links {
        twitter
        github
        steam
      }
    }
  }
`;
