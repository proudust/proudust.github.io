import * as React from 'react';

import { FaGithub } from 'react-icons/fa';
import { MdGetApp, MdLaunch, MdLink } from 'react-icons/md';

import { IconLink } from '../icon-link/IconLink';

interface ProductCardLinkProps {
  name: string;
  href: string;
}

const icons = new Map<string | null | undefined, React.ReactElement>();
icons.set('Download', <MdGetApp size={28} />);
icons.set('GitHub', <FaGithub size={28} />);
icons.set('Link', <MdLaunch size={28} />);

export const ProductCardLink: React.FC<ProductCardLinkProps> = ({ name, href }) => (
  <IconLink href={href} label={name} key={name}>
    {icons.get(name) ?? <MdLink size={28} />}
  </IconLink>
);
