import React from 'react';
import { CardActionArea, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }),
);

interface SmartLinkProps {
  children: React.ReactNode;
  href: string;
}

interface IconLinkProps extends SmartLinkProps {
  edge?: 'start' | 'end' | false;
  style?: React.CSSProperties;
}

export const IconLink: React.FC<IconLinkProps> = props => {
  const classes = useStyles();
  const { children, href, ...other } = props;

  if (props.href.substring(0, 4) === 'http') {
    return (
      <IconButton component="a" href={href} className={classes.link} {...other}>
        {children}
      </IconButton>
    );
  } else {
    return (
      <IconButton component="span" {...other}>
        <Link to={href} className={classes.link}>
          {children}
        </Link>
      </IconButton>
    );
  }
};

interface CardActionAreaLinkProps extends SmartLinkProps {
  component?: React.ElementType;
}

export const CardActionAreaLink: React.FC<CardActionAreaLinkProps> = props => {
  const classes = useStyles();
  const component = props.component ?? 'div';

  if (props.href.substring(0, 4) === 'http') {
    return (
      <CardActionArea component={component}>
        <a href={props.href} className={classes.link}>
          {props.children}
        </a>
      </CardActionArea>
    );
  } else {
    return (
      <CardActionArea component={component}>
        <Link to={props.href} className={classes.link}>
          {props.children}
        </Link>
      </CardActionArea>
    );
  }
};
