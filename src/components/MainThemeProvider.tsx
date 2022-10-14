import { PaletteMode } from '@mui/material';
import * as Colors from '@mui/material/colors';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import React, { type PropsWithChildren } from 'react';

type ColorPalette = Exclude<keyof typeof Colors, 'common'>;
const getDesignTokens = (mode: PaletteMode, palette: ColorPalette) => ({
  palette: {
    mode,
    primary: {
      main: Colors[palette][300]
    },
    text: {
      ...(mode === 'light'
        ? {
            primary: Colors.grey[900],
            secondary: Colors.grey[500],
          }
        : {
            primary: '#fff',
            secondary: Colors.grey[500],
          }
      ),
    },
  }
} as Theme);

interface ThemeController {
  toggleColorMode(): void,
  setColorPalette(value: ColorPalette): void,
  currentColors: (typeof Colors)[ColorPalette],
  palette: ColorPalette
}
const ControllerContext = React.createContext<ThemeController>(undefined as any);

const MainThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [palette, setPalette] = React.useState<ColorPalette>('blue');

  const defaultControllerContext: ThemeController = {
    toggleColorMode() {
      setMode(prev => prev === 'light' ? 'dark' : 'light');
    },
    setColorPalette(value: ColorPalette) {
      setPalette(value);
    },
    currentColors: Colors[palette],
    palette
  };
  
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode, palette)), [mode, palette])
  
  return (
    <ControllerContext.Provider value={defaultControllerContext}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ControllerContext.Provider>
  )
}

export function useThemeController(): ThemeController {
  return React.useContext(ControllerContext);
}

export default MainThemeProvider;
