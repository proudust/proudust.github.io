import React from 'react';
import { Avatar, Card, CardActions, CardHeader, IconButton } from '@material-ui/core';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

import { SteamIcon } from '../SteamIcon';
import type { ProfileQuery } from '../../../types/query';

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const { profileYaml } = useStaticQuery<ProfileQuery>(query);
  const { name, avatar, description, links } = profileYaml ?? {};

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={name ?? ''} src={avatar ?? ''} />}
        title={name}
        subheader={description}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="twitter" component="a" href={links?.twitter ?? ''}>
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="github" component="a" href={links?.github ?? ''}>
          <GitHubIcon />
        </IconButton>
        <IconButton aria-label="steam" component="a" href={links?.steam ?? ''}>
          <SteamIcon />
        </IconButton>
      </CardActions>
    </Card>
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
