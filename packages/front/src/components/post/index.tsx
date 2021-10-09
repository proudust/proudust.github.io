import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, Link } from 'gatsby';

import { PostIcon } from './PostIcon';

interface PostListProps {
  readonly children?: never;
  readonly posts: readonly GatsbyTypes.PostListFragment[];
}

const useStyles = makeStyles(theme =>
  createStyles({
    icon: {
      color: theme.palette.text.secondary,
      height: theme.spacing(6),
      width: theme.spacing(6),
      marginRight: theme.spacing(2),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      flex: 1,
    },
    excerpt: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
  }),
);

const ListPaper: typeof Paper = props => <Paper component="ul" {...props} />;

function nonNull<T>(x: T | undefined): x is T {
  return Boolean(x);
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const classes = useStyles();

  return (
    <List component={ListPaper} style={{ padding: 0 }}>
      {posts?.filter(nonNull)?.map((post, index) => (
        <React.Fragment key={index}>
          {index !== 0 ? <Divider component="li" variant="inset" /> : undefined}
          <li>
            <ListItem
              button
              component={Link}
              to={
                (post.fields?.sourceFileType === 'posts'
                  ? post.fields?.slug
                  : post.fields?.externalUrl) ?? ''
              }
            >
              <ListItemAvatar>
                <Avatar className={classes.icon}>
                  <PostIcon topic={post.fields?.topics?.[0]} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography component="h3" align="left" classes={{ root: classes.title }}>
                      {post.frontmatter?.title}
                    </Typography>
                    <Typography
                      component="time"
                      dateTime={post.fields?.createatRaw}
                      align="right"
                      color="textSecondary"
                    >
                      {post.fields?.createat}
                    </Typography>
                  </>
                }
                secondary={post.excerpt}
                classes={{ primary: classes.header, secondary: classes.excerpt }}
              />
            </ListItem>
          </li>
        </React.Fragment>
      ))}
    </List>
  );
};

export const query = graphql`
  fragment PostList on MarkdownRemark {
    excerpt
    fields {
      slug
      sourceFileType
      externalUrl
      topics
      createat(formatString: "YYYY/MM/DD")
      createatRaw: createat
    }
    frontmatter {
      title
    }
  }
`;
