import React from 'react';
import { Helmet } from 'react-helmet';
import { IconButton, Tooltip } from '@material-ui/core';

import { ZennIcon } from '../../components/ZennIcon';

interface ViewOnZennProps {
  children?: never;
  visible: boolean;
  slug: string;
}

export const ViewOnZennButton: React.FC<ViewOnZennProps> = ({ visible, slug }) => {
  if (!visible) return <></>;

  const zennSlug = slug.substring(0, slug.length - 1);
  const zennUrl = `https://zenn.dev/proudust/articles/${zennSlug}`;
  return (
    <>
      <Helmet>
        <link rel="canonical" href={zennUrl} />
      </Helmet>
      <Tooltip title="Zenn で表示" placement="bottom">
        <IconButton component="a" href={zennUrl}>
          <ZennIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
