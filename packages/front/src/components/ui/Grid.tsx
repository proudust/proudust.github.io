import React from 'react';

import { cn } from './utils';

type GridComponent = 'ul' | 'li';

export type GridProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  component?: GridComponent;
  container?: boolean;
  item?: boolean;
  spacing?: 2;
  xs?: 12;
  sm?: 6;
};

export const Grid: React.FC<GridProps> = ({
  component: Component = 'div',
  className,
  style,
  children,
  container,
  item,
  xs,
  sm,
}) => {
  const classes = cn(
    container && 'grid grid-cols-12 gap-4',
    item && xs === 12 && 'col-span-12',
    item && sm === 6 && 'sm:col-span-6',
    Component === 'ul' && 'list-none',
    className,
  );

  return React.createElement(Component, { className: classes, style }, children);
};
