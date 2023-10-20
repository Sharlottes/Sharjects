import Layouts from "src/core/Layouts";
import variableMap from "src/lib/variableMap";
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
    ${variableMap.palette.primary.main},
    transparent calc(${alphaAmount} * 0.75 * 100%)
  )`,
  color: `color-mix(in srgb, 
    ${variableMap.palette.primary.main}, 
    ${variableMap.palette.text.primary} calc((1 - ${alphaAmount}) * 100%)
  )`,
  backdropFilter: "blur(5px)",
  transition: "all 300ms",
  selectors: {
    "&:hover": {
      backgroundColor: variableMap.palette.primary.main,
      color: variableMap.palette.text.primary,
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
