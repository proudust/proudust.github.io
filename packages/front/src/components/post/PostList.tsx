import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';

import { PostIcon } from './PostIcon';
import { usePostData } from './usePostData';

interface PostListProps {
  children?: never;
  limit: number;
}

const useStyles = makeStyles(theme =>
  createStyles({
    icon: {
      color: theme.palette.text.secondary,
      height: theme.spacing(6),
      width: theme.spacing(6),
      marginRight: theme.spacing(2),
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

const ListPaper: typeof Paper = props => <Paper component="ul" {...props} />;

export const PostList: React.FC<PostListProps> = props => {
  const classes = useStyles();
  const posts = usePostData().slice(0, props.limit === 0 ? Number.MAX_VALUE : props.limit);

  return (
    <List component={ListPaper} style={{ padding: 0 }}>
      {posts.slice().map((post, index) => (
        <React.Fragment key={index}>
          {index !== 0 ? <Divider component="li" variant="inset" /> : undefined}
          <li>
            <ListItem button component={Link} to={post.url}>
              <ListItemAvatar>
                <Avatar className={classes.icon}>
                  <PostIcon tag={post.tags[0]} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${post.title} — ${post.createat.slice(0, 10)}`}
                secondary={post.excerpt}
                classes={{ secondary: classes.omitMoreThenTwoLine }}
              />
            </ListItem>
          </li>
        </React.Fragment>
      ))}
    </List>
  );
};
