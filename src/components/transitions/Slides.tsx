import React from "react";
import Slide from "@mui/material/Slide";
import type { MUISafeTransitionProps } from ".";

export const UpSlide = React.forwardRef<unknown, MUISafeTransitionProps>(
  (props, ref) => <Slide direction="up" ref={ref} {...props} />
);

export const DownSlide = React.forwardRef<unknown, MUISafeTransitionProps>(
  (props, ref) => <Slide direction="down" ref={ref} {...props} />
);

export const LeftSlide = React.forwardRef<unknown, MUISafeTransitionProps>(
  (props, ref) => <Slide direction="left" ref={ref} {...props} />
);

export const RightSlide = React.forwardRef<unknown, MUISafeTransitionProps>(
  (props, ref) => <Slide direction="right" ref={ref} {...props} />
);
