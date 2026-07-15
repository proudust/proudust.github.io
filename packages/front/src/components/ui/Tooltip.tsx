import type React from 'react';

import MuiTooltip from '@mui/material/Tooltip';
import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export type TooltipProps = Pick<MuiTooltipProps, 'children' | 'title' | 'aria-label'> & {
  placement?: 'bottom';
};

export const Tooltip = MuiTooltip as React.FC<TooltipProps>;
