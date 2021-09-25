import React from 'react';
import { Typography } from '@material-ui/core';
import { Android as AndroidIcon, GitHub as GitHubIcon } from '@material-ui/icons';

import {
  GitIcon,
  GitLabIcon,
  GoogleDriveIcon,
  JavaScriptIcon,
  PythonIcon,
  SteamIcon,
} from '../FontAwesomeIcons';

interface PostIconProps {
  readonly children?: never;
  readonly topic?: string;
}

const Icons: Map<string, React.ReactElement> = new Map();
Icons.set('android', <AndroidIcon fontSize="large" />);
Icons.set('csharp', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('git', <GitIcon size="2x" />);
Icons.set('github', <GitHubIcon fontSize="large" />);
Icons.set('gitlab', <GitLabIcon size="2x" style={{ marginTop: 5 }} />);
Icons.set('googleappsscript', <GoogleDriveIcon size="2x" style={{ marginBottom: 2 }} />);
Icons.set('javascript', <JavaScriptIcon size="2x" />);
Icons.set('renpy', <PythonIcon size="2x" />);
Icons.set('steam', <SteamIcon size="2x" />);

const DefaultIcon: React.FC<PostIconProps> = ({ topic }) => (
  <Typography component="span" variant="h5">
    {topic?.[0]}
  </Typography>
);

export const PostIcon: React.FC<PostIconProps> = ({ topic = '' }) =>
  Icons.get(topic) ?? <DefaultIcon topic={topic} />;
