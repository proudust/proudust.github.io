import React from 'react';
import { Typography } from '@mui/material';
import { Android as AndroidIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { FaGitAlt, FaGitlab, FaGoogleDrive, FaJsSquare, FaPython, FaSteam } from 'react-icons/fa';

interface PostIconProps {
  readonly children?: never;
  readonly topic?: string;
}

const Icons: Map<string, React.ReactElement> = new Map();
Icons.set('android', <AndroidIcon fontSize="large" />);
Icons.set('csharp', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('git', <FaGitAlt size="2x" />);
Icons.set('github', <GitHubIcon fontSize="large" />);
Icons.set('gitlab', <FaGitlab size="2x" style={{ marginTop: 5 }} />);
Icons.set('googleappsscript', <FaGoogleDrive size="2x" style={{ marginBottom: 2 }} />);
Icons.set('javascript', <FaJsSquare size="2x" />);
Icons.set('renpy', <FaPython size="2x" />);
Icons.set('steam', <FaSteam size="2x" />);

const DefaultIcon: React.FC<PostIconProps> = ({ topic }) => (
  <Typography component="span" variant="h5">
    {topic?.[0]}
  </Typography>
);

export const PostIcon: React.FC<PostIconProps> = ({ topic = '' }) =>
  Icons.get(topic) ?? <DefaultIcon topic={topic} />;
