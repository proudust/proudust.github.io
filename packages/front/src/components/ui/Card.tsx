import type React from 'react';

import MuiCard from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import MuiCardActions from '@mui/material/CardActions';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiCardMedia from '@mui/material/CardMedia';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

type CardHeaderTypographyProps = {
  component?: 'h3' | 'p';
  variant?: 'h6' | 'body2';
};

export type CardProps = {
  children?: React.ReactNode;
};

export type CardActionAreaProps = {
  children?: React.ReactNode;
  href?: string;
};

export type CardMediaProps = {
  className?: string;
  alt?: string;
  component?: React.ElementType;
  gatsbyImageData?: IGatsbyImageData;
};

export type CardHeaderProps = {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  titleTypographyProps?: CardHeaderTypographyProps;
  subheaderTypographyProps?: CardHeaderTypographyProps;
};

export type CardActionsProps = {
  children?: React.ReactNode;
};

export const Card = MuiCard as React.FC<CardProps>;
export const CardActionArea = MuiCardActionArea as React.FC<CardActionAreaProps>;
export const CardMedia = MuiCardMedia as React.FC<CardMediaProps>;
export const CardHeader = MuiCardHeader as React.FC<CardHeaderProps>;
export const CardActions = MuiCardActions as React.FC<CardActionsProps>;
