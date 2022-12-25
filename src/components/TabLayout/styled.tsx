import Fab, { type FabProps } from "@mui/material/Fab";
import { styled, alpha } from "@mui/material/styles";

export const CollapseFab = styled((props: { shown?: string } & FabProps) => (
  <Fab color="inherit" {...props} />
))(({ shown, theme }) =>
  theme.unstable_sx({
    ...(Boolean(shown) && {
      boxShadow: "none",
    }),
    margin: "0 5px",
    position: "fixed",
    top: "67px",
    transition: "background-color 300ms ease-out",
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
    "&:hover": {
      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.7),
    },
  })
);
