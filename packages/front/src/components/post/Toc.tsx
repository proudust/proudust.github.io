import React from 'react';

import type { TypographyProps } from '@mui/material';
import { Drawer, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@mui/styled-engine';

const TypographyDiv: React.FC<TypographyProps<'div'>> = props => (
  <Typography component="div" {...props} />
);

const TypographyToc = styled(TypographyDiv)(({ theme }) => ({
  width: 300,
  '& ul': {
    listStyle: 'none',
    margin: 0,
    paddingLeft: theme.spacing(2),
  },
  '& li': {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  '& > ul > li': {
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider,
    borderLeftWidth: 2,
  },
  '& ul ul li:last-child': {
    paddingBottom: 0,
  },
  '& a': {
    color: theme.palette.text.secondary,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  '& a:hover': {
    color: theme.palette.text.primary,
  },
  '& p': {
    margin: 0,
    paddingBottom: theme.spacing(1),
  },
}));

interface TocBodyProps {
  children?: never;
  tableOfContents?: string;
  close?: React.MouseEventHandler<HTMLDivElement>;
}

const TocBody: React.FC<TocBodyProps> = ({ tableOfContents, close }) => (
  <>
    <Typography component="span" style={{ padding: 16 }}>
      目次
    </Typography>
    <TypographyToc
      variant="subtitle1"
      onClick={close}
      dangerouslySetInnerHTML={{ __html: tableOfContents ?? '' }}
    />
  </>
);

const SideToc: React.FC<TocBodyProps> = props => {
  const theme = useTheme();
  return (
    <nav style={{ position: 'sticky', top: theme.spacing(9) }}>
      <TocBody {...props} />
    </nav>
  );
};

interface DrawerTocProps extends TocBodyProps {
  isOpen: boolean;
}

const DrawerToc: React.FC<DrawerTocProps> = ({ isOpen, ...props }) => (
  <Drawer anchor="right" open={isOpen} onClose={props.close}>
    <nav>
      <TocBody {...props} />
    </nav>
  </Drawer>
);

interface TocProps extends DrawerTocProps {
  mode: 'drawer' | 'side';
}

export const Toc: React.FC<TocProps> = ({ mode, ...props }) => {
  if (mode === 'side') return <SideToc {...props} />;
  else return <DrawerToc {...props} />;
};
