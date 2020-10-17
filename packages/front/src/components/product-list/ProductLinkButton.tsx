import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  GetApp as GetAppIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@material-ui/icons';

const icons = new Map<string, React.ReactElement>();
icons.set('Download', <GetAppIcon />);
icons.set('GitHub', <GitHubIcon />);
icons.set('Link', <LaunchIcon />);

interface ProductLinkButtonProps {
  children?: never;
  name: string;
  href: string;
}

export const ProductLinkButton: React.FC<ProductLinkButtonProps> = ({ name, href }) => (
  <Tooltip title={name} aria-label={name}>
    <IconButton href={href}>{icons.get(name)}</IconButton>
  </Tooltip>
);
