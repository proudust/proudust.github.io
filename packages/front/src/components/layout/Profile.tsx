import React from 'react';
import styled from '@mui/styled-engine';
import { Avatar, Container, ContainerProps, IconButton, Tooltip, Typography } from '@mui/material';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { graphql, useStaticQuery } from 'gatsby';

import { SteamSymbolIcon } from '../FontAwesomeIcons';

const ProfileContainerStyleLess: React.FC<ContainerProps<'footer'>> = props => (
  <Container component="footer" {...props} />
);

const ProfileContainer: React.FC<ContainerProps<'footer'>> = styled(ProfileContainerStyleLess)(
  ({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }),
);

const ProfileIcon = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ProfileAddress = styled('address')({
  display: 'flex',
  alignItems: 'center',
});

const ProfileName = styled('div')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const result = useStaticQuery<GatsbyTypes.ProfileQuery>(query);
  const { name, summary, avatar, social } = result?.site?.siteMetadata?.author ?? {};

  return (
    <ProfileContainer maxWidth="md">
      <ProfileIcon alt={name ?? ''} src={avatar ?? ''} />
      <ProfileName>
        <Typography component="p" variant="subtitle1">
          {name}
        </Typography>
        <Typography component="p" variant="caption">
          {summary}
        </Typography>
      </ProfileName>
      <ProfileAddress>
        <Tooltip title="Twitter" placement="bottom">
          <IconButton
            aria-label="twitter"
            href={`https://twitter.com/${social?.twitter}`}
            size="large"
          >
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub" placement="bottom">
          <IconButton
            aria-label="github"
            href={`https://github.com/${social?.github}`}
            size="large"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Steam" placement="bottom">
          <IconButton
            aria-label="steam"
            href={`https://steamcommunity.com/id/${social?.steam}/`}
            size="large"
          >
            <SteamSymbolIcon />
          </IconButton>
        </Tooltip>
      </ProfileAddress>
    </ProfileContainer>
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
