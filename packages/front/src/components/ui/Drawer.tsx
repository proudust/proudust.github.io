import type React from 'react';

import MuiDrawer from '@mui/material/Drawer';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

export type DrawerProps = Pick<MuiDrawerProps, 'children' | 'open' | 'onClose'> & {
  anchor?: 'right';
};

export const Drawer = MuiDrawer as React.FC<DrawerProps>;
