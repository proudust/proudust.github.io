import React from 'react';

import { cn } from './utils';

export type AppBarProps = {
  children?: React.ReactNode;
  color?: 'inherit';
  position?: 'fixed';
};

export type ToolbarProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const AppBar: React.FC<AppBarProps> = ({ children, color, position }) => (
  <header
    className={cn(
      'text-on-surface shadow-elevation-1 z-50 bg-[#272727]',
      color === 'inherit' && 'text-on-surface',
      position === 'fixed' && 'fixed top-0 right-0 left-0',
    )}
  >
    {children}
  </header>
);

export const Toolbar: React.FC<ToolbarProps> = ({ children, className, style }) => (
  <div className={cn('flex min-h-14.5 items-center px-6', className)} style={style}>
    {children}
  </div>
);
