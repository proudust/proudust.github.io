import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  GetApp as GetAppIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';

const icons = new Map<string, React.ReactElement>();
icons.set('Download', <GetAppIcon />);
icons.set('GitHub', <GitHubIcon />);
icons.set('Link', <LaunchIcon />);

interface ProductLinkButtonProps {
  children?: never;
  name?: string;
  href?: string;
}

export const ProductLinkButton: React.FC<ProductLinkButtonProps> = ({ name, href }) => {
  name ??= '';
  href ??= '';
  return (
    <Tooltip title={name} aria-label={name}>
      <IconButton href={href} size="large">
        {icons.get(name)}
      </IconButton>
    </Tooltip>
  );
};
