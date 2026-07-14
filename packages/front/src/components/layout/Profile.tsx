import React from 'react';

import { Avatar, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FaGithub, FaSteamSymbol } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const result = useStaticQuery<Queries.ProfileQuery>(query);
  const { name, summary, social } = result?.site?.siteMetadata?.author ?? {};

  return (
    <Container
      component="footer"
      maxWidth="md"
      className="flex items-center mt-6 mb-20 max-sm:flex-col max-sm:text-center"
    >
      <Avatar className="m-2">
        <StaticImage alt={name ?? ''} src="../../../content/avatar.jpg"></StaticImage>
      </Avatar>
      <div className="grow mx-2">
        <Typography component="p" variant="subtitle1">
          {name}
        </Typography>
        <Typography component="p" variant="caption">
          {summary}
        </Typography>
      </div>
      <address className="flex items-center">
        <Tooltip title="Twitter" placement="bottom">
          <IconButton
            aria-label="twitter"
            href={`https://twitter.com/${social?.twitter}`}
            size="large"
          >
            <FaTwitter />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub" placement="bottom">
          <IconButton
            aria-label="github"
            href={`https://github.com/${social?.github}`}
            size="large"
          >
            <FaGithub />
          </IconButton>
        </Tooltip>
        <Tooltip title="Steam" placement="bottom">
          <IconButton
            aria-label="steam"
            href={`https://steamcommunity.com/id/${social?.steam}/`}
            size="large"
          >
            <FaSteamSymbol />
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
