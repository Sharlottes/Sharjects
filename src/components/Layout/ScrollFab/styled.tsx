import styled from "@mui/system/styled";
import Layouts from "src/core/Layouts";

export const ScrollFabContainer = styled("div")({
  position: "fixed",
  right: 16,
  bottom: 48,
  width: 40,
  height: 40,
  zIndex: Layouts.SCROLL_FAB,
  "& button": {
    position: "fixed",
    right: 16,
    bottom: 48,
    transition: "all 500ms",
    "&:not(:nth-of-type(1))": {
      opacity: 0,
    },
    "&:nth-of-type(1)": {
      zIndex: Layouts.SCROLL_FAB - 1,
      opacity: 1,
    },
  },
  "&:hover": {
    "& button": {
      "&:nth-of-type(1)": {
        opacity: 0,
        zIndex: Layouts.SCROLL_FAB - 1,
        pointerEvents: "none",
      },
      "&:nth-of-type(2)": {
        opacity: 1,
        transform: "translateY(-24px)",
      },
      "&:nth-of-type(3)": {
        opacity: 1,
        transform: "translateY(24px)",
      },
    },
  },
});
