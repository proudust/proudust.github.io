import React from 'react';

import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { Typography } from './Typography';
import { cn } from './utils';

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

export const Card: React.FC<CardProps> = ({ children }) => (
  <article className="bg-surface text-on-surface shadow-elevation-1 relative rounded hover:z-10">
    {children}
  </article>
);

export const CardActionArea: React.FC<CardActionAreaProps> = ({ children, href }) => (
  <a
    href={href}
    className="focus-visible:outline-secondary relative z-0 block overflow-hidden rounded-t text-inherit no-underline transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    {children}
  </a>
);

export const CardMedia: React.FC<CardMediaProps> = ({
  component: Component,
  className,
  alt,
  gatsbyImageData,
}) => {
  if (Component) {
    return (
      <Component
        className={cn('block w-full object-cover', className)}
        alt={alt}
        gatsbyImageData={gatsbyImageData}
      />
    );
  }

  return <div className={cn('block w-full object-cover', className)} aria-label={alt} />;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subheader,
  titleTypographyProps,
  subheaderTypographyProps,
}) => (
  <div className="px-4 py-4">
    {title ? (
      <Typography
        component={titleTypographyProps?.component ?? 'h3'}
        variant={titleTypographyProps?.variant ?? 'h6'}
      >
        {title}
      </Typography>
    ) : null}
    {subheader ? (
      <Typography
        component={subheaderTypographyProps?.component ?? 'p'}
        variant={subheaderTypographyProps?.variant ?? 'body2'}
        color="textSecondary"
        className="mt-1"
      >
        {subheader}
      </Typography>
    ) : null}
  </div>
);

export const CardActions: React.FC<CardActionsProps> = ({ children }) => (
  <div className="relative z-10 flex items-center gap-1 overflow-visible rounded-b px-2 py-2">
    {children}
  </div>
);
