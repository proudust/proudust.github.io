import React from 'react';

import { Typography } from '../ui';
import 'prismjs/themes/prism-tomorrow.css';

interface ArticleProps {
  children?: never;
  html?: string;
}

export const Article: React.FC<ArticleProps> = ({ html }) => (
  <Typography
    component="div"
    variant="body1"
    className="article-content"
    dangerouslySetInnerHTML={{ __html: html ?? '' }}
  />
);
