import { style } from "@vanilla-extract/css";
import ThemeVariables from "src/core/ThemeVariables";

export const titleContainer = style({ margin: "10vh 5vw 0" });

export const titleTypography = style({
  fontWeight: "bold",
  fontSize: "max(4rem, 10vw)",
  justifyContent: "center",
});

export const keywordsContainer = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  margin: "10px auto",
});

export const keyword = style({
  color: ThemeVariables.palette.primary.main,
  fontSize: "25px",
  fontFamily: "var(--font-nanum-pen-script)",
});

export const contentsBox = style({
  width: "100%",
  padding: "20px 0",
  display: "flex",
  marginTop: "24px",
  flexDirection: "column",
  gap: "30px",
});
