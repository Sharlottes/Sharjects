import * as Colors from "@mui/material/colors";
import type { Color, PaletteMode, ThemeOptions } from "@mui/material";

type ColorPalette = Exclude<keyof typeof Colors, "common">;

function getLightPalette() {
  return {
    themedBlack: "black",
    themedWhite: "white",
    text: {
      primary: Colors.grey[900],
      secondary: Colors.grey[500],
    },
    github: {
      backgroundColor: "white",
      linkColor: "#0969da",
      borderColor: "#d0d7de",
      iconColor: "#57606a",
    },
  };
}

function getDarkPalette() {
  return {
    themedBlack: "white",
    themedWhite: "black",
    text: {
      primary: "#fff",
      secondary: Colors.grey[500],
    },
    github: {
      backgroundColor: "#0d1117",
      linkColor: "#58a6ff",
      borderColor: "#30363d",
      iconColor: "#8b949e",
    },
  };
}

function getPalettes(mode: PaletteMode, palette: ColorPalette) {
  return {
    mode,
    primary: {
      main: Colors[palette][300],
    },
    main: Colors[palette],
    ...(mode === "light" ? getLightPalette() : getDarkPalette()),
  };
}
export function getDesignTokens(
  mode: PaletteMode,
  palette: ColorPalette
): ThemeOptions {
  return {
    typography: {
      fontFamily: "var(--font-pretendard)",
    },
    palette: getPalettes(mode, palette),
  };
}

type CustomPalette = ReturnType<typeof getPalettes>;

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partial<CustomPalette> {}
}
