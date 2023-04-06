import styled from "@mui/system/styled";
import { alpha } from "@mui/system/colorManipulator";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar, { type AppBarProps } from "@mui/material/AppBar";

import Layouts from "src/core/Layouts";
import Colorf from "src/utils/Colorf";
import { toDigit } from "src/utils/toDigit";

import { motion, type MotionProps } from "framer-motion";

export const StyledAppBar = styled((props: AppBarProps & MotionProps) => (
  <AppBar {...props} component={motion.div} />
))<{
  alphaAmount: number;
}>(({ theme, alphaAmount }) =>
  theme.unstable_sx({
    transition: "all 300ms",
    backdropFilter: "blur(5px)",
    zIndex: Layouts.HEADER,
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,${
      alphaAmount * 0.2
    }), 0px 4px 5px 0px rgba(0,0,0,${
      alphaAmount * 0.14
    }), 0px 1px 10px 0px rgba(0,0,0,${alphaAmount * 0.12})`,
    backgroundColor: (theme) =>
      alpha(theme.palette.primary.main, alphaAmount * 0.75),
    "& *": {
      color: (theme) =>
        (theme.palette.mode === "light"
          ? Colorf.colorLerp("#111111", "#ffffff", toDigit(alphaAmount))
          : "white") + " !important",
    },
    "&:hover": {
      backgroundColor: (theme) => alpha(theme.palette.primary.main, 1),
      "& *": {
        color: "white !important",
      },
    },
  })
);

export const StyledToolbar = styled(Toolbar)({
  padding: "0 16px",
  display: "flex",
  height: "60px",
  alignItems: "center",
});

export const LandingPageLinkButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  })
);
