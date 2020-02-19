import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { CardActionAreaLink } from './Link';
import { SteamIcon } from './SteamIcon';
import { QiitaIcon } from './QiitaIcon';

interface PostListProps {
  children?: never;
  type: 'inside' | 'qiita' | 'steam-guide';
  title: string;
  excerpt: string;
  createat: string;
  thumbnail: string;
  url: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1, 0),
    },
    media: {
      width: 151,
    },
    detail: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    excerpt: {
      flex: 1,
      paddingTop: 0,
    },
    omitMoreThenTwoLine: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
  }),
);

export const PostCard: React.FC<PostListProps> = ({
  type,
  title,
  excerpt,
  createat,
  thumbnail,
  url,
}) => {
  const classes = useStyles();
  const icon = {
    inside: undefined,
    qiita: <QiitaIcon />,
    'steam-guide': <SteamIcon />,
  }[type];

  return (
    <CardActionAreaLink component="li" href={url}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={thumbnail} title={title} />
        <div className={classes.detail}>
          <CardHeader
            avatar={icon}
            title={title}
            titleTypographyProps={{ className: classes.omitMoreThenTwoLine }}
            subheader={createat.slice(0, 10)}
          />
          <CardContent className={classes.excerpt}>
            <Typography
              className={classes.omitMoreThenTwoLine}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {excerpt}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionAreaLink>
  );
};
