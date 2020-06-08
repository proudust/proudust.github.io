import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGitAlt,
  faGitlab,
  faGoogleDrive,
  faJsSquare,
  faPython,
  faSteam,
} from '@fortawesome/free-brands-svg-icons';
import { Typography } from '@material-ui/core';
import { Android as AndroidIcon, GitHub as GitHubIcon } from '@material-ui/icons';

interface PostIconProps {
  readonly children?: never;
  readonly tag?: string;
}

const Icons: Map<string, React.ReactElement> = new Map();
Icons.set('Android', <AndroidIcon fontSize="large" />);
Icons.set('C#', <Typography component="span" variant="h5">C#</Typography>); // prettier-ignore
Icons.set('Git', <FontAwesomeIcon icon={faGitAlt} size="2x" />);
Icons.set('GitHub', <GitHubIcon fontSize="large" />);
Icons.set('GitLab', <FontAwesomeIcon icon={faGitlab} size="2x" style={{ marginTop: 5 }} />);
Icons.set('Google Apps Script', <FontAwesomeIcon icon={faGoogleDrive} size="2x" style={{ marginBottom: 2 }} />); // prettier-ignore
Icons.set('JavaScript', <FontAwesomeIcon icon={faJsSquare} size="2x" />);
Icons.set("Ren'Py", <FontAwesomeIcon icon={faPython} size="2x" />);
Icons.set('Steam', <FontAwesomeIcon icon={faSteam} size="2x" />);

const DefaultIcon: React.FC<PostIconProps> = ({ tag }) => (
  <Typography component="span" variant="h5">
    {tag?.[0]}
  </Typography>
);

export const PostIcon: React.FC<PostIconProps> = ({ tag = '' }) =>
  Icons.get(tag) ?? <DefaultIcon tag={tag} />;
