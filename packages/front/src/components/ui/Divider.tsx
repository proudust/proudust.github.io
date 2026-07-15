import React from 'react';

import { cn } from './utils';

export type DividerProps = {
  style?: React.CSSProperties;
  component?: 'li';
  variant?: 'inset';
};

export const Divider: React.FC<DividerProps> = ({
  component: Component = 'hr',
  variant,
  style,
}) => {
  const classes = cn(
    'border-0 border-t border-divider',
    variant === 'inset' && 'ml-[72px]',
    Component === 'li' && 'list-none',
  );

  return React.createElement(Component, { className: classes, style });
};
