import React from 'react';

import type { PaperProps } from '@mui/material';
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
import styled from '@mui/styled-engine';
import { graphql, Link } from 'gatsby';

import { PostIcon } from './PostIcon';

interface PostListProps {
  readonly children?: never;
  readonly posts: readonly Queries.PostListFragment[];
}

const PostAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: theme.spacing(6),
  width: theme.spacing(6),
  marginRight: theme.spacing(2),
}));

const ListPaper: React.FC<PaperProps<'ul'>> = props => <Paper component="ul" {...props} />;

const ListItemContent = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .MuiListItemText-secondary': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
});

function nonNull<T>(x: T | undefined): x is T {
  return Boolean(x);
}

export const PostList: React.FC<PostListProps> = ({ posts }) => (
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
              <PostAvatar>
                <PostIcon topic={post.fields?.topics?.[0] || undefined} />
              </PostAvatar>
            </ListItemAvatar>
            <ListItemContent
              primary={
                <>
                  <Typography component="h3" align="left">
                    {post.frontmatter?.title}
                  </Typography>
                  <Typography
                    component="time"
                    dateTime={post.fields?.createatRaw || undefined}
                    align="right"
                    color="textSecondary"
                  >
                    {post.fields?.createat}
                  </Typography>
                </>
              }
              secondary={post.excerpt}
            />
          </ListItem>
        </li>
      </React.Fragment>
    ))}
  </List>
);

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
