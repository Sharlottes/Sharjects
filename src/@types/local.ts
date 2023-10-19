import type { TransitionProps } from "@mui/material/transitions";
import type { Theme } from "@mui/material/styles";

export interface MUISafeTransitionProps
  extends Omit<TransitionProps, "appear" | "in"> {
  children: React.ReactElement<any, any>;
}

export type MUIThemeCSSVariables = Partial<
  Exclude<
    CSSVariableNames<
      Pick<
        Theme,
        | "palette"
        | "breakpoints"
        | "direction"
        | "shape"
        | "shadows"
        | "typography"
        | "transitions"
        | "zIndex"
      >,
      "theme",
      []
    >,
    Array<null>[keyof Array<null>]
  >
>;
