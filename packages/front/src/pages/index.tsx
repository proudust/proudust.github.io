import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';
import { Link } from 'gatsby';

import { Layout } from '../components/layout';
import { PostList } from '../components/PostList';
import { ProductList } from '../components/ProductList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerLink: {
      textDecoration: 'none',
    },
    headerButton: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1, 0),
    },
    headerText: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 0),
    },
    headerIcon: {
      margin: theme.spacing(1),
    },
  }),
);

interface SectionHeaderProps {
  children: string;
  href: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = props => {
  const classes = useStyles();

  return (
    <Button className={classes.headerButton} component={Link} to={props.href}>
      <Typography variant="h5" color="textPrimary">
        {props.children}
      </Typography>
      <ArrowForwardIcon className={classes.headerIcon} />
    </Button>
  );
};

interface IndexProps {
  children?: never;
}

export const Index: React.FC<IndexProps> = () => (
  <Layout>
    <section>
      <SectionHeader href="/posts">投稿</SectionHeader>
      <PostList limit={5} />
    </section>
    <section>
      <SectionHeader href="/products">制作物</SectionHeader>
      <ProductList />
    </section>
  </Layout>
);

export default Index;
