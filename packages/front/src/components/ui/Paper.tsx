import type React from 'react';

import MuiPaper from '@mui/material/Paper';
import type { PaperProps as MuiPaperProps } from '@mui/material/Paper';

type PaperComponent = 'ul' | 'article';

export type PaperProps<C extends React.ElementType = 'div'> = Pick<
  MuiPaperProps<C>,
  'children' | 'className' | 'style'
> & {
  component?: PaperComponent;
};

export const Paper = MuiPaper as React.FC<PaperProps>;
