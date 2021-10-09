import React from 'react';
import styled from '@mui/styled-engine';
import { Typography, TypographyProps } from '@mui/material';
import 'prismjs/themes/prism-tomorrow.css';

const TypographyDiv: React.FC<TypographyProps<'div'>> = props => (
  <Typography component="div" {...props} />
);

const ArticleContent = styled(TypographyDiv)(({ theme }) => ({
  '& a': {
    color: theme.palette.secondary.main,
  },
  '& a:hover': {
    color: theme.palette.secondary.light,
  },
  '& h2': {
    marginTop: theme.spacing(8),
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    borderBottomWidth: 1,
  },
  '& th': {
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    borderBottomWidth: 1,
    padding: theme.spacing(1),
  },
  '& td': {
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    borderBottomWidth: 1,
    padding: theme.spacing(1),
  },
  '& hr': {
    marginTop: theme.spacing(8),
    borderStyle: 'none',
    backgroundColor: theme.palette.divider,
    height: 1,
  },
  '& .footnotes p': {
    display: 'inline',
  },
}));

interface ArticleProps {
  children?: never;
  html?: string;
}

export const Article: React.FC<ArticleProps> = ({ html }) => (
  <ArticleContent variant="body1" dangerouslySetInnerHTML={{ __html: html ?? '' }} />
);
