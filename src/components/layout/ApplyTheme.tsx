import React, { useMemo } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

interface ApplyThemeProps {
  children: React.ReactNode;
}

export const ApplyTheme: React.FC<ApplyThemeProps> = ({ children }) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => createMuiTheme({ palette: { type: isDarkMode ? 'dark' : 'light' } }),
    [isDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
