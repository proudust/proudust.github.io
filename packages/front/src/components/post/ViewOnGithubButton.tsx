import React from 'react';

import { GitHub as GitHubIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

interface ShowByGithubButtonProps {
  children?: never;
  slug: string;
}

export const ViewOnGithubButton: React.FC<ShowByGithubButtonProps> = ({ slug }) => (
  <Tooltip title="GitHub で表示" placement="bottom">
    <IconButton
      component="a"
      href={`https://github.com/proudust/proudust.github.io/blob/master-src/packages/posts${slug}index.md`}
      size="large"
    >
      <GitHubIcon />
    </IconButton>
  </Tooltip>
);
