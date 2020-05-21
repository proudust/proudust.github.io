import React from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({ palette: { type: 'dark', secondary: green } });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Helmet>
      <html lang="ja" />
    </Helmet>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default Layouts;
