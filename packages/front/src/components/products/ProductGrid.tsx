import * as React from 'react';

import { graphql } from 'gatsby';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { ProductCard } from './ProductCard';

interface ProductsBaseProps {
  products: readonly {
    image?: IGatsbyImageData;
    title: string;
    description: string;
    links: readonly {
      name: string;
      href: string;
    }[];
  }[];
}

const ProductGridLayout: React.FC<ProductsBaseProps> = ({ products }) => (
  <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    {products?.map(({ title, description, image, links }, index) => (
      <ProductCard
        key={index}
        title={title}
        description={description}
        image={image}
        links={links}
      />
    ))}
  </ul>
);

interface ProductsProps {
  products?: readonly Queries.ProductGridFragment[];
}

export const ProductGrid: React.FC<ProductsProps> = ({ products: rawProducts }) => {
  const products = (rawProducts ?? []).map(node => ({
    title: node?.title ?? '',
    description: node?.description ?? '',
    image: node?.image?.childImageSharp?.gatsbyImageData ?? undefined,
    links: (node?.links ?? []).map(link => ({
      name: link?.name ?? '',
      href: link?.href ?? '',
    })),
  }));

  return <ProductGridLayout products={products} />;
};

export const query = graphql`
  fragment ProductGrid on Product {
    title
    description
    image {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    links {
      name
      href
    }
  }
`;
