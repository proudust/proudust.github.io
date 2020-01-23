import React from 'react';
import { CardActionArea } from '@material-ui/core';
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

interface CardActionAreaLinkProps {
  children: React.ReactNode;
  href: string;
}

export const CardActionAreaLink: React.FC<CardActionAreaLinkProps> = props => {
  const classes = useStyles();

  if (props.href.substring(0, 4) === 'http') {
    return (
      <CardActionArea component="a" href={props.href} className={classes.link}>
        {props.children}
      </CardActionArea>
    );
  } else {
    return (
      <CardActionArea component="div">
        <Link to={props.href} className={classes.link}>
          {props.children}
        </Link>
      </CardActionArea>
    );
  }
};
