import React from "react";
import MUIFade from "@mui/material/Fade";
import type { MUISafeTransitionProps } from "src/@type";

const Fade = React.forwardRef<unknown, MUISafeTransitionProps>((props, ref) => (
  <MUIFade ref={ref} {...props} />
));

export default Fade;
