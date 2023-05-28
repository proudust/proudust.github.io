import React from 'react';

import { CssBaseline } from '@mui/material';
import { green } from '@mui/material/colors';
import type { Theme as MuiTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends MuiTheme {}
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540, // default: 600,
      md: 864, // default: 960,
      lg: 1152, // default: 1280,
      xl: 1728, // default: 1920,
    },
  },
  palette: { mode: 'dark', secondary: green },
});

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="ja" />
      </Helmet>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

export default Layouts;
