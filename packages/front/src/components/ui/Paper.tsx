import React from 'react';

import { cn } from './utils';

type PaperComponent = 'ul' | 'article';

export type PaperProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  component?: PaperComponent;
};

export const Paper: React.FC<PaperProps> = ({
  component: Component = 'div',
  className,
  style,
  children,
}) =>
  React.createElement(
    Component,
    { className: cn('bg-surface text-on-surface shadow-elevation-1', className), style },
    children,
  );
