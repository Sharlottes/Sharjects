import { style } from "@vanilla-extract/css";
import variableMap from "src/lib/variableMap";
import Layouts from "src/core/Layouts";

export const sideMenu = style({
  zIndex: Layouts.SIDE_MENU,
});

export const sideMenuContainer = style({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  padding: "10px 24px",
  paddingTop: "80px",
  margin: 0,
  boxShadow: "10px 0px 20px 0px black",
  "@media": {
    [`(max-width: 600px)`]: {
      width: "100vw",
    },
  },
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const divTypography = style({
  margin: "10px 0",
  fontWeight: 500,
  fontSize: "12px",
  textAlign: "left",
  selectors: {
    "&::before": { top: 0 },
    "&::after": { top: 0 },
  },
});

// #region header
export const sideMenuHeader = style({
  margin: "0 auto",
});

export const sideMenuTitle = style({
  fontWeight: 800,
  fontSize: 20,
  transition: "color 150ms ease-in",
  selectors: {
    "&:hover": {
      color: variableMap.palette.main[600],
    },
  },
});

export const sideMenuSubtitle = style({
  position: "relative",
  left: 100,
});

// #endregion

// #region nav
export const navButtons = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px",
});

export const navButton = style({
  borderRadius: "20px",
});

// #endregion

// #region projects
export const bodyContainer = style({
  margin: "15px 0 auto 10px",
  gap: "10px",
});

export const ownerRow = style({
  display: "flex",
  fontSize: 16,
  fontWeight: 500,
  transition: "color 150ms ease-in",
  selectors: {
    "&:hover": {
      color: variableMap.palette.main[600],
    },
  },
});

export const ownerProfileImage = style({
  borderRadius: "20px",
  marginRight: "5px",
});

export const projectRow = style({
  margin: "3px 0",
  display: "flex",
  justifyContent: "space-between",
});

export const projectLabel = style({
  transition: "all 100ms ease",
  transform: "translateX(35px)",
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  selectors: {
    [`${projectRow}:hover &`]: {
      transform: "translateX(50px)",
      color: variableMap.palette.main[300],
    },
  },
});

export const projectIconContainer = style({
  width: "1rem",
  height: "1rem",
  marginRight: "5px",
});

export const projectLinks = style({
  display: "flex",
  flexDirection: "row-reverse",
});

export const projectLinkIcon = style({
  transform: "scale(0.8)",
  color: "lightgray",
  transition: "color 300ms ease-out",
  selectors: {
    "&:hover": {
      color: variableMap.palette.text.primary,
    },
  },
});

// #endregion

// #region footer

export const visitorContainer = style({
  width: "fit-content",
  margin: "0 auto",
  fontSize: 12,
  fontWeight: 500,
});

export const linksContainer = style({
  display: "flex",
  justifyContent: "space-evenly",
});

export const link = style({
  transition: "transform 200ms",
  transform: "translateY(0)",
  color: "inherit",
  selectors: {
    "&:hover": { transform: "translateY(-5px)" },
  },
});

// #endregion
