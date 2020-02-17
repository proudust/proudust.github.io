import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { CardActionAreaLink } from './SmartLink';
import { SteamIcon } from './SteamIcon';
import { QiitaIcon } from './QiitaIcon';
import { QiitaThumbnailQuery } from '../../types/query';

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
  const { file } = useStaticQuery<QiitaThumbnailQuery>(query);
  if (type === 'qiita' && !thumbnail) {
    thumbnail = file?.childImageSharp?.fixed?.src ?? '';
  }
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
          <CardHeader avatar={icon} title={title} subheader={createat.slice(0, 10)} />
          <CardContent className={classes.excerpt}>
            <Typography variant="body2" color="textSecondary" component="p">
              {excerpt}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionAreaLink>
  );
};

export const query = graphql`
  query QiitaThumbnail {
    file(relativePath: { eq: "qiita-square.png" }) {
      childImageSharp {
        fixed(width: 151, height: 151) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
