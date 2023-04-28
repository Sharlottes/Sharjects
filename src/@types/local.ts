import type { TransitionProps } from "@mui/material/transitions";
export interface MUISafeTransitionProps
  extends Omit<TransitionProps, "appear" | "in"> {
  children: React.ReactElement<any, any>;
}
