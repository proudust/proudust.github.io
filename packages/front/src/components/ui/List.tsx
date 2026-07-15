import type React from 'react';

import MuiList from '@mui/material/List';
import type { ListProps as MuiListProps } from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import type { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import type { ListItemAvatarProps as MuiListItemAvatarProps } from '@mui/material/ListItemAvatar';
import MuiListItemText from '@mui/material/ListItemText';
import type { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
import type { Link } from 'gatsby';

export type ListProps = Pick<MuiListProps, 'children' | 'style'> & {
  component?: React.ElementType;
};

export type ListItemProps = Pick<MuiListItemProps, 'children'> & {
  button?: boolean;
  component?: typeof Link;
  to?: string;
};

export type ListItemAvatarProps = Pick<MuiListItemAvatarProps, 'children'>;

export type ListItemTextProps = Pick<MuiListItemTextProps, 'className' | 'primary' | 'secondary'>;

export const List = MuiList as React.FC<ListProps>;
export const ListItem = MuiListItem as React.FC<ListItemProps>;
export const ListItemAvatar = MuiListItemAvatar as React.FC<ListItemAvatarProps>;
export const ListItemText = MuiListItemText as React.FC<ListItemTextProps>;
