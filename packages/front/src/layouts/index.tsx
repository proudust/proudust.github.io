import React from 'react';

import { Helmet } from 'react-helmet';

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = ({ children }) => (
  <>
    <Helmet>
      <html lang="ja" />
    </Helmet>
    {children}
  </>
);

export default Layouts;
