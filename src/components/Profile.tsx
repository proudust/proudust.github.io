import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@material-ui/icons';

import { QiitaIcon, SteamIcon } from './Icons';

export const Profile: React.FC = () => (
  <Card>
    <CardHeader
      avatar={
        <Avatar
          alt="Proudust"
          src="http://www.gravatar.com/avatar/7c5f546f80eeb2c158c8699d2f8bbc4f"
        />
      }
      title="Proudust"
    />
    <CardContent>
      <Typography variant="body2" component="p">
        {`
          TypeScript(React, GAS), Kotlin(Android), C#(ASP,NET, WinForms), Python2(Ren'Py)な無職鶏。
          一応FE(基本情報), AP(応用情報)持ってる。
        `}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="twitter" component="a" href="https://twitter.com/proudust">
        <TwitterIcon />
      </IconButton>
      <IconButton aria-label="github" component="a" href="https://github.com/proudust">
        <GitHubIcon />
      </IconButton>
      <IconButton aria-label="qiita" component="a" href="https://qiita.com/proudust">
        <QiitaIcon />
      </IconButton>
      <IconButton aria-label="qiita" component="a" href="https://steamcommunity.com/id/proudust/">
        <SteamIcon />
      </IconButton>
    </CardActions>
  </Card>
);
