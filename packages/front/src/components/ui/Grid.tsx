import type React from 'react';

import MuiGrid from '@mui/material/Grid';
import type { GridProps as MuiGridProps } from '@mui/material/Grid';

type GridComponent = 'ul' | 'li';

export type GridProps = Pick<MuiGridProps, 'children' | 'style'> & {
  component?: GridComponent;
  container?: boolean;
  item?: boolean;
  spacing?: 2;
  xs?: 12;
  sm?: 6;
};

export const Grid = MuiGrid as React.FC<GridProps>;
