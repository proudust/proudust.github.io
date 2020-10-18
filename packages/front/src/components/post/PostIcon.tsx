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
  readonly tag?: string;
}

const Icons: Map<string, React.ReactElement> = new Map();
Icons.set('Android', <AndroidIcon fontSize="large" />);
Icons.set('C#', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('csharp', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('Git', <GitIcon size="2x" />);
Icons.set('GitHub', <GitHubIcon fontSize="large" />);
Icons.set('GitLab', <GitLabIcon size="2x" style={{ marginTop: 5 }} />);
Icons.set('Google Apps Script', <GoogleDriveIcon size="2x" style={{ marginBottom: 2 }} />);
Icons.set('JavaScript', <JavaScriptIcon size="2x" />);
Icons.set("Ren'Py", <PythonIcon size="2x" />);
Icons.set('Steam', <SteamIcon size="2x" />);

const DefaultIcon: React.FC<PostIconProps> = ({ tag }) => (
  <Typography component="span" variant="h5">
    {tag?.[0]}
  </Typography>
);

export const PostIcon: React.FC<PostIconProps> = ({ tag = '' }) =>
  Icons.get(tag) ?? <DefaultIcon tag={tag} />;
