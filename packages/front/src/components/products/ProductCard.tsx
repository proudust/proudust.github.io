import * as React from 'react';

import { GatsbyImage } from 'gatsby-plugin-image';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import { FaGithub } from 'react-icons/fa';
import { MdGetApp, MdLaunch } from 'react-icons/md';

import { ProductCardLink } from './ProductCardLink';

interface ProductCardProps {
  image?: IGatsbyImageData;
  title: string;
  description: string;
  links: readonly {
    name: string;
    href: string;
  }[];
}

const icons = new Map<string | null | undefined, React.ReactElement>();
icons.set('Download', <MdGetApp size={28} />);
icons.set('GitHub', <FaGithub size={28} />);
icons.set('Link', <MdLaunch size={28} />);

export const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, links }) => (
  <li className="card card-compact bg-base-100 shadow-xl">
    {image && <GatsbyImage className="max-h-60" image={image} alt={title}></GatsbyImage>}
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        {links?.map(({ name, href }) => (
          <ProductCardLink href={href} name={name} key={name} />
        ))}
      </div>
    </div>
  </li>
);
