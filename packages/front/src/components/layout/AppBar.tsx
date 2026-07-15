import React from 'react';

import { MdArrowBack } from 'react-icons/md';

import { AppBar, IconButton, Toolbar, Typography } from '../ui';

interface BackButtonProps {
  children?: never;
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href }) => (
  <IconButton edge="start" aria-label="back" className="mr-4 text-inherit" href={href} size="large">
    <MdArrowBack />
  </IconButton>
);

interface DefaultAppBarProps {
  children?: never;
  title: string;
  backref?: string;
  actions?: React.ReactNode;
}

export const DefaultAppBar: React.FC<DefaultAppBarProps> = ({ title, backref, actions }) => (
  <AppBar color="inherit" position="fixed">
    <Toolbar className="flex min-h-14.5">
      {backref && <BackButton href={backref} />}
      <Typography className="grow" variant="h6" noWrap>
        {title}
      </Typography>
      {actions}
    </Toolbar>
  </AppBar>
);
