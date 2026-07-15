import React from 'react';

import type { Link } from 'gatsby';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  component?: typeof Link;
  to?: string;
};

export const Button: React.FC<ButtonProps> = ({
  component: Component,
  to,
  className,
  children,
}) => {
  if (Component && to) {
    return (
      <Component to={to} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};
