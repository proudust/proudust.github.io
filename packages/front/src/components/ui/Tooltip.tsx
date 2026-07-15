import React from 'react';

import { cn } from './utils';

export type TooltipProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  'aria-label'?: string;
  placement?: 'bottom' | 'top';
};

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'bottom',
  'aria-label': ariaLabel,
}) => (
  <span className="group relative z-10 inline-flex" aria-label={ariaLabel}>
    {children}
    {title ? (
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded bg-[#616161] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100',
          placement === 'bottom' && 'top-full mt-1',
          placement === 'top' && 'bottom-full mb-1',
        )}
      >
        {title}
      </span>
    ) : null}
  </span>
);
