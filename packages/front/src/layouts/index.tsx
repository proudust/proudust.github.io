import React from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540, // default: 600,
      md: 864, // default: 960,
      lg: 1152, // default: 1280,
      xl: 1728, // default: 1920,
    },
  },
  palette: { type: 'dark', secondary: green },
});

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
