import React from 'react';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import 'prismjs/themes/prism-tomorrow.css';

const useStyles = makeStyles(theme =>
  createStyles({
    content: {
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
        ...theme.typography.body2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        padding: theme.spacing(1),
      },
      '& td': {
        ...theme.typography.body2,
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
    },
  }),
);

interface ArticleProps {
  children?: never;
  html?: string;
}

export const Article: React.FC<ArticleProps> = ({ html }) => {
  const classes = useStyles();
  return (
    <Typography
      className={classes.content}
      component="div"
      variant="body1"
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
};
