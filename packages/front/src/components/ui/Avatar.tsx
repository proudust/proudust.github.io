import React from 'react';

import { cn } from './utils';

export type AvatarProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ className, children }) => (
  <div
    className={cn(
      'inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full',
      className,
    )}
  >
    {children}
  </div>
);
