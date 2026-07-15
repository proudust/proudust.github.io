import type React from 'react';

import MuiDivider from '@mui/material/Divider';
import type { DividerProps as MuiDividerProps } from '@mui/material/Divider';

export type DividerProps = Pick<MuiDividerProps, 'style'> & {
  component?: 'li';
  variant?: 'inset';
};

export const Divider = MuiDivider as React.FC<DividerProps>;
