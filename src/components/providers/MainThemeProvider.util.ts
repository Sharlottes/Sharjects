import * as Colors from "@mui/material/colors";
import type { PaletteMode, ThemeOptions } from "@mui/material";

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

namespace U {
  export function getDesignTokens(
    mode: PaletteMode,
    palette: ColorPalette
  ): ThemeOptions {
    return {
      typography: {
        fontFamily: "inherit",
      },
      palette: {
        mode,
        primary: {
          main: Colors[palette][300],
        },
        ...(mode === "light" ? getLightPalette() : getDarkPalette()),
      },
    };
  }
}

export default U;
