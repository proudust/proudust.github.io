import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({ palette: { type: 'dark' } });

interface ApplyThemeProps {
  children: React.ReactNode;
}

export const ApplyTheme: React.FC<ApplyThemeProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
