import React from 'react';

import { Layout } from '../components/layout';
import { Paper, Typography } from '../components/ui';

interface NotFoundProps {
  children?: never;
}

export const NotFound: React.FC<NotFoundProps> = () => (
  <Layout title="404: Not Found" backref="/">
    <Paper className="p-6">
      <Typography component="h2" variant="h5">
        ページが見つかりません
      </Typography>
    </Paper>
  </Layout>
);

export default NotFound;
