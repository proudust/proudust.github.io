import React from 'react';

import type { Link } from 'gatsby';

import { cn } from './utils';

export type ListProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  component?: React.ElementType;
};

export type ListItemProps = {
  children?: React.ReactNode;
  button?: boolean;
  component?: typeof Link;
  to?: string;
};

export type ListItemAvatarProps = {
  children?: React.ReactNode;
};

export type ListItemTextProps = {
  className?: string;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
};

export const List: React.FC<ListProps> = ({ component: Component = 'ul', style, children }) =>
  React.createElement(Component, { className: 'm-0 list-none p-0', style }, children);

export const ListItem: React.FC<ListItemProps> = ({
  children,
  button,
  component: Component,
  to,
}) => {
  if (button && Component && to) {
    return (
      <Component
        to={to}
        className="flex w-full items-center px-4 py-2 text-inherit no-underline transition-colors hover:bg-white/8"
      >
        {children}
      </Component>
    );
  }

  return <div className="flex w-full items-center px-4 py-2">{children}</div>;
};

export const ListItemAvatar: React.FC<ListItemAvatarProps> = ({ children }) => (
  <div className="flex min-w-14 shrink-0 items-center justify-center">{children}</div>
);

export const ListItemText: React.FC<ListItemTextProps> = ({ className, primary, secondary }) => (
  <div className={cn('min-w-0 flex-1', className)}>
    {primary ? <div className="post-list-item-primary">{primary}</div> : null}
    {secondary ? (
      <div className="post-list-item-secondary text-on-surface-muted text-sm">{secondary}</div>
    ) : null}
  </div>
);
