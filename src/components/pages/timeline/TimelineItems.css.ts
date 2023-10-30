import { style, globalStyle } from "@vanilla-extract/css";
import ThemeVariables from "src/core/ThemeVariables";

export const timelineItemsContainer = style({
  marginTop: "10px",
  transition: "all 300ms",
});

export const timelineItemContainer = style({
  display: "flex",
});

export const timeConnector = style({
  borderLeft: "solid 1px #bdbdbd",
  minHeight: "48px",
  marginRight: "var(--gap)",
  vars: {
    "--gap": "20px",
  },
  selectors: {
    "&:has( .has-content)": {
      vars: {
        "--gap": "20px",
        "--size": "var(--gap)",
        "--color": ThemeVariables.palette.primary.main,
      },
    },
    "&:not(:has( .has-content))": {
      vars: {
        "--gap": "20px",
        "--size": "calc(var(--gap) / 2)",
        "--color": "lightgray",
      },
    },
    "&::after": {
      content: "''",
      position: "absolute",
      transform: "translate(calc(var(--size) / -2), calc(var(--size) * 3 / 4))",
      borderRadius: "calc(var(--size) / 2)",
      width: "var(--size)",
      height: "var(--size)",
      backgroundColor: "var(--color)",
    },
  },
});

export const header = style({
  color: "themedBlack",
  fontFamily: "bold",
  fontSize: "35px",
});

export const dummyHeader = style({
  fontSize: "5px",
  color: "#9e9e9e",
});

export const timeContent = style({
  margin: "20px 0px 20px 10px",
  border: "1px solid #fcfcfc",
  borderRadius: "20px",
  padding: "15px",
});
globalStyle(`${timeContent} > h1`, {
  fontSize: ThemeVariables.typography.h5.fontSize,
  fontWeight: ThemeVariables.typography.h5.fontWeight,
  lineHeight: ThemeVariables.typography.h5.lineHeight,
});
globalStyle(`${timeContent} > p`, {
  marginLeft: "min(3vw, 20px)",
  maxWidth: "700px",
});
globalStyle(`${timeContent} > a`, {
  color: "blue",
});
globalStyle(`${timeContent} > div`, {
  margin: "min(2vw, 10px)",
  width: "min(100%, 400px)",
});
