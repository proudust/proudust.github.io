import React from 'react';

import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// BackButton

interface BackButtonProps {
  children?: never;
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const theme = useTheme();

  return (
    <IconButton
      edge="start"
      aria-label="back"
      style={{ color: 'inherit', marginRight: theme.spacing(2) }}
      href={href}
      size="large"
    >
      <ArrowBackIcon color="inherit" />
    </IconButton>
  );
};

// DefaultAppBar

interface DefaultAppBarProps {
  children?: never;
  title: string;
  backref?: string;
  actions?: React.ReactNode;
}

export const DefaultAppBar: React.FC<DefaultAppBarProps> = ({ title, backref, actions }) => (
  <AppBar color="inherit" position="fixed">
    <Toolbar style={{ minHeight: 58, display: 'flex' }}>
      {backref && <BackButton href={backref} />}
      <Typography style={{ flexGrow: 1 }} variant="h6" noWrap>
        {title}
      </Typography>
      {actions}
    </Toolbar>
  </AppBar>
);
