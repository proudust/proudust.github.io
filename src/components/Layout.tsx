import React from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

export const Layout: React.FC = props => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            proudust.github.io
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ padding: theme.spacing(3) }}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{props.children}</Container>
      </main>
    </>
  );
};
