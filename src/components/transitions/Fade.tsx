import React from "react";
import MUIFade from "@mui/material/Fade";
import type { MUISafeTransitionProps } from ".";

const Fade = React.forwardRef<unknown, MUISafeTransitionProps>((props, ref) => (
  <MUIFade ref={ref} {...props} />
));

export default Fade;
