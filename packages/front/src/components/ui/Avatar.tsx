import type React from 'react';

import MuiAvatar from '@mui/material/Avatar';
import type { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

export type AvatarProps = Pick<MuiAvatarProps, 'children' | 'className'>;

export const Avatar = MuiAvatar as React.FC<AvatarProps>;
