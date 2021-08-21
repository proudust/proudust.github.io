import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';

interface ShowByGithubButtonProps {
  children?: never;
  slug: string;
}

export const ViewOnGithubButton: React.FC<ShowByGithubButtonProps> = ({ slug }) => (
  <Tooltip title="GitHub で表示" placement="bottom">
    <IconButton
      component="a"
      href={`https://github.com/proudust/proudust.github.io/blob/master-src/packages/posts${slug}index.md`}
    >
      <GitHubIcon />
    </IconButton>
  </Tooltip>
);
