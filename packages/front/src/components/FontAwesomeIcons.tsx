import React from 'react';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faGitAlt,
  faGitlab,
  faGoogleDrive,
  faJsSquare,
  faPython,
  faSteam,
  faSteamSymbol,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

config.autoAddCss = false;
library.add(faGitAlt, faGitlab, faGoogleDrive, faJsSquare, faPython, faSteam);

type I = React.FC<Omit<FontAwesomeIconProps, 'icon'>>;

export const GitIcon: I = props => <FontAwesomeIcon icon={faGitAlt} {...props} />;
export const GitLabIcon: I = props => <FontAwesomeIcon icon={faGitlab} {...props} />;
export const GoogleDriveIcon: I = props => <FontAwesomeIcon icon={faGoogleDrive} {...props} />;
export const JavaScriptIcon: I = props => <FontAwesomeIcon icon={faJsSquare} {...props} />;
export const PythonIcon: I = props => <FontAwesomeIcon icon={faPython} {...props} />;
export const SteamIcon: I = props => <FontAwesomeIcon icon={faSteam} {...props} />;
export const SteamSymbolIcon: I = props => <FontAwesomeIcon icon={faSteamSymbol} {...props} />;
