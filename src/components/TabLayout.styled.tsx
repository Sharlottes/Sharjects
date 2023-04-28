import Fab from "@mui/material/Fab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";
import { styled, darken, alpha } from "@mui/material/styles";

export const TabLayoutCollapseFab = styled(Fab)<{ shown?: string }>(
  ({ shown, theme }) =>
    theme.unstable_sx({
      ...(Boolean(shown) && {
        boxShadow: "none",
      }),
      margin: "0 5px",
      transition: "background-color 300ms ease-out",
      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
      "&:hover": {
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.7),
      },
    })
);

export const TabLayoutCollapse = styled(Collapse)({
  borderRadius: "0 0 20px 20px",
  backdropFilter: "brightness(0.9)",
});

export const TabLayoutToolbar = styled(Toolbar)({
  marginLeft: "20px",
  width: "80%",
});

export const TabLayoutTabs = styled(Tabs)(({ theme }) =>
  theme.unstable_sx({
    marginLeft: "20px",
    width: "80%",
    "& .MuiTab-root": {
      "&.Mui-selected": {
        color: (theme) => darken(theme.palette.primary.main, 0.5),
      },
      transition: "color 0.5s",
    },
  })
);
