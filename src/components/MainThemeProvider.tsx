import React, { type PropsWithChildren } from "react";

import * as Colors from "@mui/material/colors";
import { createTheme, type Theme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import type { PaletteMode } from "@mui/material";
import type { PaletteColor, PaletteColorOptions } from "@mui/material/styles";
import type { Color } from "@mui/material";

type Partialize<T> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends PaletteColor
    ? PaletteColorOptions
    : Partial<T[P]>;
};

type CustomPalette = Record<"themedWhite" | "themedBlack", PaletteColor> &
  Record<"accent" | "health", Color>;

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partialize<CustomPalette> {}
}

type ColorPalette = Exclude<keyof typeof Colors, "common">;
const getDesignTokens = (mode: PaletteMode, palette: ColorPalette) =>
  ({
    palette: {
      mode,
      primary: {
        main: Colors[palette][300],
      },
      themedBlack: { main: mode === "light" ? "black" : "white" },
      themedWhite: { main: mode === "light" ? "white" : "black" },
      text: {
        ...(mode === "light"
          ? {
              primary: Colors.grey[900],
              secondary: Colors.grey[500],
            }
          : {
              primary: "#fff",
              secondary: Colors.grey[500],
            }),
      },
    },
  } as Theme);

interface ThemeController {
  toggleColorMode(): void;
  setColorPalette(value: ColorPalette): void;
  currentColors: (typeof Colors)[ColorPalette];
  palette: ColorPalette;
}
const ControllerContext = React.createContext<ThemeController>({
  toggleColorMode: () => {
    throw new Error("subscribed out of provider!");
  },
  setColorPalette: () => {
    throw new Error("subscribed out of provider!");
  },
  currentColors: Colors.blue,
  palette: "blue",
});

const MainThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
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
    () => createTheme(getDesignTokens(mode, palette)),
    [mode, palette]
  );

  return (
    <ControllerContext.Provider value={defaultControllerContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ControllerContext.Provider>
  );
};

export function useThemeController(): ThemeController {
  return React.useContext(ControllerContext);
}

export default MainThemeProvider;
