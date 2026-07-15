import React from 'react';

import { cn } from './utils';

export type IconButtonProps = {
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  edge?: 'start';
  size?: 'large';
  component?: 'a';
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full text-on-surface transition-colors hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary';

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  'aria-label': ariaLabel,
  href,
  onClick,
  style,
  edge,
  size,
  component,
}) => {
  const classes = cn(
    baseClasses,
    size === 'large' ? 'size-[52px] p-3 text-2xl' : 'h-9 w-9 p-2 text-xl',
    edge === 'start' && '-ml-3',
    className,
  );

  if (href || component === 'a') {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
