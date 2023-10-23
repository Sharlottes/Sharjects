import { createVar, keyframes, style } from "@vanilla-extract/css";
import variableMap from "src/lib/variableMap";

export const i = createVar();
const contentWidth = "min(max(500px, 45vw), 100vw)";
const prog = `calc(0.2 + 0.15 * ${i})`;

const moveToLeft = {
  "0%": {
    width: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
    transform: `translateX(${contentWidth})`,
  },
  "100%": {
    width: `calc(${contentWidth} * ${prog})`,
    clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%)",
    transform: `translateX(calc(${contentWidth} * (1 - ${prog})))`,
  },
};
const moveToRight = {
  "0%": {
    width: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
  },
  "100%": {
    width: `calc(${contentWidth} * ${prog})`,
    clipPath: "polygon(0% 0%, 50% 0%, 100% 100%, 0 100%)",
  },
};

const moveToLeftAnimation = keyframes(moveToLeft);
const moveToLeftAnimation2 = keyframes(moveToLeft);

const moveToRightAnimation = keyframes(moveToRight);
const moveToRightAnimation2 = keyframes(moveToRight);

export const contentContainer = style({
  textAlign: "center",
  width: contentWidth,
  height: "100px",
  border: "1px solid gray",
  transition: "box-shadow 500ms",
  backgroundColor: variableMap.palette.themedWhite,
  selectors: {
    "&[data-toright='true']": {
      alignSelf: "flex-end",
      borderRadius: "20px 1px 1px 20px",
    },
    "&[data-toright='false']": {
      alignSelf: "flex-start",
      borderRadius: "1px 20px 20px 1px",
    },
    "&:hover": {
      boxShadow: `8px 8px 15px`,
    },
  },
});

export const contentWrapper = style({
  transition: "all 300ms 700ms",
  padding: "20px",
  backgroundColor: variableMap.palette.themedWhite,
  selectors: {
    [`${contentContainer}:hover &`]: {
      transition: "all 300ms",
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
});

export const shower = style({
  position: "absolute",
  width: contentWidth,
  height: "99px",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      left: 0,
      opacity: 0,
      zIndex: -1,
      height: "inherit",
      backgroundColor: `color-mix(
        in srgb, 
        ${variableMap.palette.primary.main},
        transparent calc(100% - 100% * (0.4 + 0.3 * (2 - ${i})))
      )`,
      animationDuration: "0.5s",
      transition: "all 1.2s",
    },
    [`${contentContainer}[data-toright='true'] &`]: {
      alignSelf: "flex-end",
    },
    [`${contentContainer}[data-toright='false'] &`]: {
      alignSelf: "flex-start",
    },
    [`${contentContainer}[data-toright='true']:hover &::before`]: {
      animationName: moveToRightAnimation,
    },
    [`${contentContainer}[data-toright='false']:hover &::before`]: {
      animationName: moveToLeftAnimation,
    },
    [`${contentContainer}[data-toright='true']:not(:hover) &::before`]: {
      animationName: moveToRightAnimation2,
    },
    [`${contentContainer}[data-toright='false']:not(:hover) &::before`]: {
      animationName: moveToLeftAnimation2,
    },
    [`${contentContainer}:not(:hover) &::before`]: {
      animationDuration: `calc((3 - ${i}) * 300ms)`,
      animationDirection: "reverse",
    },
    [`${contentContainer}:hover &::before`]: {
      opacity: 1,
      animationDelay: `calc(${i} * 150ms)`,
      animationFillMode: "forwards",
      animationDirection: "normal",
    },
    [`${contentContainer}[data-toright='true'] &::before`]: {
      borderRadius: "20px 1px 1px 20px",
    },
    [`${contentContainer}[data-toright='false'] &::before`]: {
      borderRadius: "1px 20px 20px 1px",
    },
  },
});
