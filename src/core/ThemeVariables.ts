import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "src/components/providers/MainThemeProvider.util";
import { getCssVariablesByTheme } from "src/utils/getCssVariablesByTheme";

const { ThemeVariables } = getCssVariablesByTheme(
  createTheme(getDesignTokens("light", "blue"))
);

export default ThemeVariables;
