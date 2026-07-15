import React from 'react';

import {
  FaAndroid,
  FaGithub,
  FaGitAlt,
  FaGitlab,
  FaGoogleDrive,
  FaJsSquare,
  FaPython,
  FaSteam,
} from 'react-icons/fa';

import { Typography } from '../ui';

interface PostIconProps {
  readonly children?: never;
  readonly topic?: string;
}

const Icons: Map<string, React.ReactElement> = new Map();
Icons.set('android', <FaAndroid size="2em" />);
Icons.set('csharp', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('git', <FaGitAlt size="2em" />);
Icons.set('github', <FaGithub size="2em" />);
Icons.set('gitlab', <FaGitlab size="2em" style={{ marginTop: 5 }} />);
Icons.set('googleappsscript', <FaGoogleDrive size="2em" style={{ marginBottom: 2 }} />);
Icons.set('javascript', <FaJsSquare size="2em" />);
Icons.set('renpy', <FaPython size="2em" />);
Icons.set('steam', <FaSteam size="2em" />);

const DefaultIcon: React.FC<PostIconProps> = ({ topic }) => (
  <Typography component="span" variant="h5">
    {topic?.[0]}
  </Typography>
);

export const PostIcon: React.FC<PostIconProps> = ({ topic = '' }) =>
  Icons.get(topic) ?? <DefaultIcon topic={topic} />;
