import Layouts from "src/core/Layouts";
import ThemeVariables from "src/core/ThemeVariables";
import { style, createVar } from "@vanilla-extract/css";

export const alphaAmount = createVar();
export const appBar = style({
  position: "fixed",
  left: 0,
  right: 0,
  zIndex: Layouts.HEADER,
  boxShadow: `
    0px 2px 4px -1px rgba(0, 0, 0, calc(${alphaAmount} * 0.2)), 
    0px 4px 5px 0px rgba(0, 0, 0, calc(${alphaAmount} * 0.14)), 
    0px 1px 10px 0px rgba(0, 0, 0, calc(${alphaAmount} * 0.12))`,
  backgroundColor: `color-mix(in srgb,
    ${ThemeVariables.palette.primary.main},
    transparent calc(${alphaAmount} * 0.75 * 100%)
  )`,
  color: `color-mix(in srgb, 
    ${ThemeVariables.palette.primary.main}, 
    ${ThemeVariables.palette.text.primary} calc((1 - ${alphaAmount}) * 100%)
  )`,
  backdropFilter: "blur(5px)",
  transition: "all 300ms",
  selectors: {
    "&:hover": {
      backgroundColor: ThemeVariables.palette.primary.main,
      color: ThemeVariables.palette.text.primary,
    },
  },
});

export const toolbar = style({
  height: "60px",
  padding: "0 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const gotoHomeLink = style({
  marginLeft: "8px",
  fontWeight: "bold",
  fontSize: 20,
  flex: 1,
});

export const colorSelectMenu = style({
  padding: "8px",
  fontSize: "15px",
  fontWeight: 500,
});

export const color = createVar();
export const coloredDoat = style({
  backgroundColor: color,
  width: "20px",
  height: "20px",
  borderRadius: "10px",
  margin: "5px",
  cursor: "pointer",
});

export const ColorSelectionContainer = style({
  overflow: "hidden",
  display: "flex",
  flexWrap: "wrap",
  width: "300px",
});
export const ColorSelectIndicator = style({
  position: "absolute",
  width: "30px",
  height: "5px",
  backgroundColor: "#ffd37f",
});
