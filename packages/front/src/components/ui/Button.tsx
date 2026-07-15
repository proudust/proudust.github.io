import type React from 'react';

import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { Link } from 'gatsby';

export type ButtonProps = Pick<MuiButtonProps, 'children' | 'className'> & {
  component?: typeof Link;
  to?: string;
};

export const Button = MuiButton as React.FC<ButtonProps>;
