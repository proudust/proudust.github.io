import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import QiitaFavicon from './images/qiita-favicon.png';
import SteamFavicon from './images/steam-favicon.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: 24,
      width: 24,
    },
  }),
);

export const QiitaIcon: React.FC = () => {
  const classes = useStyles();
  return <img alt="qiita" src={QiitaFavicon} className={classes.icon} />;
};

export const SteamIcon: React.FC = () => {
  const classes = useStyles();
  return <img alt="qiita" src={SteamFavicon} className={classes.icon} />;
};
