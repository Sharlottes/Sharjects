import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import styled from "@mui/system/styled";

export const SignInButton = styled(Button)(({ theme }) =>
  theme.unstable_sx({
    transition: "color,background-color 200ms cubic-bezier(.17,1.78,.74,-1.02)",
    color: "primary.main",
    "&:hover": {
      color: "white",
      backgroundColor: "primary.main",
    },
  })
);

export const CloseButton = styled(IconButton)(({ theme }) =>
  theme.unstable_sx({
    transition: "color 200ms",
    "&:hover": { color: "primary.main" },
  })
);
