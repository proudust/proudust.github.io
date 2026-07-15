import React from 'react';

import { FaGithub } from 'react-icons/fa';
import { MdDownload, MdOpenInNew } from 'react-icons/md';

import { IconButton, Tooltip } from '../ui';

const icons = new Map<string, React.ReactElement>();
icons.set('Download', <MdDownload />);
icons.set('GitHub', <FaGithub />);
icons.set('Link', <MdOpenInNew />);

interface ProductLinkButtonProps {
  children?: never;
  name?: string | null;
  href?: string | null;
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
