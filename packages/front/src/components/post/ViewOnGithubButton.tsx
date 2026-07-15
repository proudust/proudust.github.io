import React from 'react';

import { FaGithub } from 'react-icons/fa';

import { IconButton, Tooltip } from '../ui';

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
      <FaGithub />
    </IconButton>
  </Tooltip>
);
