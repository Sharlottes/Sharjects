import React from "react";

import * as Colors from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import type { PaletteMode } from "@mui/material";
import * as U from "./MainThemeProvider.util";
import { getCssVariablesByTheme } from "src/utils/getCssVariablesByTheme";

type ColorPalette = Exclude<keyof typeof Colors, "common">;
interface ThemeController {
  toggleColorMode(): void;
  setColorPalette(value: ColorPalette): void;
  currentColors: (typeof Colors)[ColorPalette];
  palette: ColorPalette;
}
const ControllerContext = React.createContext<ThemeController>({
  toggleColorMode: () => {},
  setColorPalette: () => {},
  currentColors: Colors.blue,
  palette: "blue",
});

const MainThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [palette, setPalette] = React.useState<ColorPalette>("blue");

  React.useEffect(() => {
    const mode = localStorage.getItem("themeMode") as PaletteMode | null;
    const palette = localStorage.getItem("themeColor") as ColorPalette | null;
    if (mode) setMode(mode);
    if (palette) setPalette(palette);
  }, []);

  const defaultControllerContext: ThemeController = {
    toggleColorMode() {
      localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    },
    setColorPalette(value: ColorPalette) {
      localStorage.setItem("themeColor", value);
      setPalette(value);
    },
    currentColors: Colors[palette],
    palette,
  };

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(U.getDesignTokens(mode, palette)),
    [mode, palette]
  );

  const { css: cssVariableTheme } = React.useMemo(
    () => getCssVariablesByTheme(theme),
    [theme]
  );

  return (
    <>
      <style>{`
      :root {
        ${cssVariableTheme}
      }`}</style>
      <ControllerContext.Provider value={defaultControllerContext}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ControllerContext.Provider>
    </>
  );
};

export function useThemeController(): ThemeController {
  return React.useContext(ControllerContext);
}

export default MainThemeProvider;
