import React from 'react';

import { cn } from './utils';

type TypographyVariant = 'h1' | 'h5' | 'h6' | 'subtitle1' | 'caption' | 'body1' | 'body2';
type TypographyColor = 'textPrimary' | 'textSecondary';
type TypographyAlign = 'left' | 'right';
type TypographyComponent = 'p' | 'h1' | 'h2' | 'h3' | 'time' | 'div' | 'span';

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-normal',
  h5: 'text-2xl font-normal',
  h6: 'text-xl font-medium tracking-wide',
  subtitle1: 'text-base font-normal leading-7',
  caption: 'text-xs leading-relaxed',
  body1: 'text-base font-normal leading-normal',
  body2: 'text-sm font-normal leading-snug',
};

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

export const Typography: React.FC<TypographyProps> = ({
  component: Component = 'p',
  variant,
  color,
  align,
  className,
  style,
  noWrap,
  children,
  dangerouslySetInnerHTML,
  onClick,
  dateTime,
  property,
}) => {
  const classes = cn(
    variant && variantClasses[variant],
    color === 'textPrimary' && 'text-on-surface',
    color === 'textSecondary' && 'text-on-surface-muted',
    align === 'left' && 'text-left',
    align === 'right' && 'text-right',
    noWrap && 'truncate',
    className,
  );

  return React.createElement(
    Component,
    {
      className: classes,
      style,
      onClick,
      ...(Component === 'time' ? { dateTime } : {}),
      ...(property ? { property } : {}),
      ...(dangerouslySetInnerHTML ? { dangerouslySetInnerHTML } : {}),
    },
    dangerouslySetInnerHTML ? undefined : children,
  );
};
