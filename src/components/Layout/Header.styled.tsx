import styled from "@mui/system/styled";
import Checkbox from "@mui/material/Checkbox";

export const ThemeSwitch = styled(Checkbox)({
  transition: "all 300ms",
  animation: "animate 1s ease-in-out",
  "&.Mui-checked": {
    animation: "animate1 1s ease-in-out",
  },
  "@keyframes animate1": {
    "0%": {
      transform: "rotate(0deg) scale(1)",
    },
    "50%": {
      transform: "rotate(360deg) scale(0)",
    },
    "100%": {
      transform: "rotate(0deg) scale(1)",
    },
  },
  "@keyframes animate": {
    "0%": {
      transform: "rotate(0deg) scale(1)",
    },
    "50%": {
      transform: "rotate(360deg) scale(0)",
    },
    "100%": {
      transform: "rotate(0deg) scale(1)",
    },
  },
});
