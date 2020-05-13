import React from 'react';
import { CardActionArea, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }),
);

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

interface IconLinkProps extends LinkProps {
  edge?: 'start' | 'end' | false;
  style?: React.CSSProperties;
}

export const IconLink: React.FC<IconLinkProps> = props => {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <IconButton component="a" className={classes.link} {...other}>
      {children}
    </IconButton>
  );
};

export const CardActionAreaLink: React.FC<LinkProps> = props => {
  const classes = useStyles();

  return (
    <CardActionArea component="a" href={props.href} className={classes.link}>
      {props.children}
    </CardActionArea>
  );
};
