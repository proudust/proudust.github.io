import React from 'react';

import { useTheme } from '@mui/material/styles';

import { Layout } from '../components/layout';
import { Paper, Typography } from '../components/ui';

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
