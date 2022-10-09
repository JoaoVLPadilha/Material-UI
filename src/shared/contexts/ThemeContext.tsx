import React, { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DarkTheme, LightTheme } from '../themes/index';
import { Box } from '@mui/system';
interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}
const ThemeContext = React.createContext({} as IThemeContextData);

export const useAppThemeContext = () =>{
  return React.useContext(ThemeContext)
}

type Props = {
  children?: JSX.Element[] | ReactElement;
};
export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeName, setThemeName] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = React.useCallback(() => {
    setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = React.useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
