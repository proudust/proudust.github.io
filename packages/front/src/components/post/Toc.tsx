import React from 'react';

import { Drawer, Typography } from '../ui';

interface TocBodyProps {
  children?: never;
  tableOfContents?: string;
  close?: React.MouseEventHandler<HTMLDivElement>;
}

const TocBody: React.FC<TocBodyProps> = ({ tableOfContents, close }) => (
  <>
    <Typography component="span" className="p-4">
      目次
    </Typography>
    <Typography
      component="div"
      variant="subtitle1"
      className="toc-content"
      onClick={close}
      dangerouslySetInnerHTML={{ __html: tableOfContents ?? '' }}
    />
  </>
);

const SideToc: React.FC<TocBodyProps> = props => (
  <nav className="top-app-bar sticky hidden lg:block lg:shrink-0">
    <TocBody {...props} />
  </nav>
);

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

type TocProps = DrawerTocProps;

export const Toc: React.FC<TocProps> = props => (
  <>
    <SideToc {...props} />
    <DrawerToc {...props} />
  </>
);
