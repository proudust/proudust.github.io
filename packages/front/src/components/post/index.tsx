import React from 'react';

import { graphql, Link } from 'gatsby';

import type { PaperProps } from '../ui';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '../ui';

import { PostIcon } from './PostIcon';

interface PostListProps {
  readonly children?: never;
  readonly posts: readonly Queries.PostListFragment[];
}

const ListPaper: React.FC<PaperProps> = props => <Paper component="ul" {...props} />;

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
              <Avatar className="text-on-surface-muted mr-4 h-12 w-12 bg-[#757575]">
                <PostIcon topic={post.fields?.topics?.[0] || undefined} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className="post-list-item-content my-1.5"
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
