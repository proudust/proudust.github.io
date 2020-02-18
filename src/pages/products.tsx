import React from 'react';

import { Layout } from '../components/Layout';
import { ProductList } from '../components/ProductList';

interface ProductListProps {
  children?: never;
}

export const Products: React.FC<ProductListProps> = () => (
  <Layout title="制作物" backref="/">
    <section>
      <ProductList />
    </section>
  </Layout>
);

export default Products;
