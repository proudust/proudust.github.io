import type React from 'react';

import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';

export type AppBarProps = Pick<MuiAppBarProps, 'children'> & {
  color?: 'inherit';
  position?: 'fixed';
};

export type ToolbarProps = Pick<MuiToolbarProps, 'children' | 'style'>;

export const AppBar = MuiAppBar as React.FC<AppBarProps>;
export const Toolbar = MuiToolbar as React.FC<ToolbarProps>;
