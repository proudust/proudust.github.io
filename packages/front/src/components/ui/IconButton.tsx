import type React from 'react';

import MuiIconButton from '@mui/material/IconButton';

export type IconButtonProps = {
  children?: React.ReactNode;
  'aria-label'?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  edge?: 'start';
  size?: 'large';
  component?: 'a';
};

export const IconButton = MuiIconButton as React.FC<IconButtonProps>;
