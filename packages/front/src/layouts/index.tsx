import React from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline, adaptV4Theme } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  Theme as MuiTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { green } from '@mui/material/colors';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends MuiTheme {}
}

const theme = createTheme(
  adaptV4Theme({
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
  }),
);

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
