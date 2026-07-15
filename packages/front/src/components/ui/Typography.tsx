import type React from 'react';

import MuiTypography from '@mui/material/Typography';

type TypographyVariant = 'h1' | 'h5' | 'h6' | 'subtitle1' | 'caption' | 'body1' | 'body2';
type TypographyColor = 'textPrimary' | 'textSecondary';
type TypographyAlign = 'left' | 'right';
type TypographyComponent = 'p' | 'h1' | 'h2' | 'h3' | 'time' | 'div' | 'span';

export type TypographyProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dangerouslySetInnerHTML?: { __html: string };
  onClick?: React.MouseEventHandler<HTMLElement>;
  dateTime?: string;
  property?: string;
  noWrap?: boolean;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  component?: TypographyComponent;
};

export const Typography = MuiTypography as React.FC<TypographyProps>;
