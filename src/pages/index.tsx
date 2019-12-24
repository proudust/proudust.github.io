import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Layout } from '../components/Layout';
import { Products } from '../components/Products';
import { Profile } from '../components/Profile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    content: {
      padding: theme.spacing(3),
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h5" className={classes.header}>
        プロフィール
      </Typography>
      <Profile />
      <Typography variant="h5" className={classes.header}>
        作ったもの
      </Typography>
      <Products />
    </Layout>
  );
};

export default App;
