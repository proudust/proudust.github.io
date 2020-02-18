import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import { IconLink } from '../SmartLink';

// BackButton

interface BackButtonProps {
  children?: never;
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const theme = useTheme();

  return (
    <IconLink
      edge="start"
      aria-label="back"
      style={{ color: 'inherit', marginRight: theme.spacing(2) }}
      href={href}
    >
      <ArrowBackIcon color="inherit" />
    </IconLink>
  );
};

// DefaultAppBar

interface DefaultAppBarProps {
  children?: never;
  title: string;
  backref?: string;
}

export const DefaultAppBar: React.FC<DefaultAppBarProps> = ({ title, backref }) => (
  <AppBar position="fixed">
    <Toolbar style={{ minHeight: 58 }}>
      {backref && <BackButton href={backref} />}
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);
