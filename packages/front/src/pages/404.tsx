import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { Layout } from '../components/layout';

interface NotFoundProps {
  children?: never;
}

export const NotFound: React.FC<NotFoundProps> = () => {
  const theme = useTheme();

  return (
    <Layout title="404: Not Found" backref="/">
      <Paper style={{ padding: theme.spacing(3) }}>
        <Typography component="h2" variant="h5">
          ページが見つかりません
        </Typography>
      </Paper>
    </Layout>
  );
};

export default NotFound;
