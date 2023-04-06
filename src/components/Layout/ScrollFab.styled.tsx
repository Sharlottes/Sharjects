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
    "&:not(.main-btn)": {
      opacity: 0,
    },
    "&.main-btn": {
      zIndex: Layouts.SCROLL_FAB - 1,
      opacity: 1,
    },
  },
  "&:hover": {
    "& button": {
      "&.main-btn": {
        opacity: 0,
        zIndex: Layouts.SCROLL_FAB - 1,
        pointerEvents: "none",
      },
      "&.up-btn": {
        opacity: 1,
        transform: "translateY(-24px)",
      },
      "&.down-btn": {
        opacity: 1,
        transform: "translateY(24px)",
      },
    },
  },
});
