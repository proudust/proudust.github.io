import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FaGithub, FaSteamSymbol } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';

import { Avatar, IconButton, Tooltip, Typography } from '../ui';

interface ProfileProps {
  children?: never;
}

export const Profile: React.FC<ProfileProps> = () => {
  const result = useStaticQuery<Queries.ProfileQuery>(query);
  const { name, summary, social } = result?.site?.siteMetadata?.author ?? {};

  return (
    <footer className="mx-auto mt-6 mb-20 flex max-w-216 items-center px-6 max-sm:flex-col max-sm:text-center">
      <Avatar className="m-2">
        <StaticImage alt={name ?? ''} src="../../../content/avatar.jpg"></StaticImage>
      </Avatar>
      <div className="mx-2 grow">
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
    </footer>
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
