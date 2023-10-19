import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { createVar, keyframes, style } from "@vanilla-extract/css";
const i = createVar();
const contentWidth = "min(max(500px, 45vw), 100vw)";
const prog = `calc(0.2 + 0.15 * var(${i}))`;

const moveToLeft = keyframes({
  from: {
    width: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
    transform: "translateX(var(--content-width))",
  },
  to: {
    width: `calc(var(--content-width) * ${prog})`,
    clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%)",
    transform: `translateX(calc(var(--content-width) * (1 - ${prog})))`,
  },
});
const moveToRight = keyframes({
  from: {
    width: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
  },
  to: {
    width: `calc(var(--content-width) * ${prog})`,
    clipPath: "polygon(0% 0%, 50% 0%, 100% 100%, 0 100%)",
  },
});

const contentContainer = style({
  textAlign: "center",
  width: contentWidth,
  height: "100px",
  border: "1px solid gray",
  transition: "box-shadow 500ms",
  backdropFilter: "blur(10px)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "black",
    },
    "(prefers-color-scheme: light)": {
      backgroundColor: "white",
    },
  },
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

const contentWrapper = style({
  transition: "all 300ms 300ms",
  padding: "20px",
  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "black",
    },
    "(prefers-color-scheme: light)": {
      backgroundColor: "white",
    },
  },
  selectors: {
    [`${contentContainer}:hover &`]: {
      transition: "all 300ms",
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
});

const shower = style({
  position: "absolute",
  width: "var(--content-width)",
  height: "99px",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      left: 0,
      opacity: 0,
      zIndex: -1,
      height: "inherit",
      backgroundColor: alpha(theme.palette.primary.main, 0.6 + 0.2 * (2 - i)),
      animationFillMode: "forwards",
      transition: "all 1s",
    },
    "&[data-toright='true']": {
      alignSelf: "flex-end",
    },
    "&[data-toright='false']": {
      alignSelf: "flex-start",
    },
    "&[data-toright='true']::before": {
      borderRadius: "20px 1px 1px 20px",
      animationName: moveToLeft,
    },
    "&[data-toright='false']::before": {
      borderRadius: "1px 20px 20px 1px",
      animationName: moveToRight,
    },
    [`${contentContainer}:hover &::before`]: {
      opacity: 1,
      animationFillMode: "forwards",
      animation: `0.5s linear calc(var(${i}) * 150)ms`,
    },
  },
});

export default {
  ContentContainer: styled(motion.div, {
    shouldForwardProp: (props) => props !== "toright",
  })<{
    toright: boolean;
  }>(({ theme, toright }) =>
    theme.unstable_sx({
      "--content-width": "min(max(500px, 45vw), 100vw)",
      textAlign: "center",
      alignSelf: toright ? "flex-end" : "flex-start",
      width: "var(--content-width)",
      height: "100px",
      border: "1px solid gray",
      borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
      backgroundColor: theme.palette.mode === "light" ? "white" : "black",
      transition: "box-shadow 500ms",
      backdropFilter: "blur(10px)",
      "&:hover": {
        boxShadow: `${toright ? "-8px" : "8px"} 8px 15px`,
        "& > div": {
          transition: "all 300ms",
          backgroundColor: "rgba(0,0,0,0)",
        },
        "& .shower::before": {
          opacity: 1,
          animationName: `move${toright ? "r" : ""}`,
        },
      },
    })
  ),
  Shower: styled("div", {
    shouldForwardProp: (props) => props !== "toright",
  })<{
    toright: boolean;
    i: number;
  }>(({ theme, i, toright }) =>
    theme.unstable_sx({
      position: "absolute",
      alignSelf: toright ? "flex-end" : "flex-start",
      width: "var(--content-width)",
      height: "99px",
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        opacity: 0,
        zIndex: -1,
        height: "inherit",
        borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
        backgroundColor: alpha(theme.palette.primary.main, 0.6 + 0.2 * (2 - i)),
        animation: `0.5s linear ${i * 150}ms`,
        animationFillMode: "forwards",
        transition: "all 1s",
        "--prog": 0.2 + 0.15 * i,
        [`@keyframes move${toright ? "r" : ""}`]: {
          from: {
            width: 0,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
            transform: !toright && "translateX(var(--content-width))",
          },
          to: {
            width: `calc(var(--content-width) * var(--prog))`,
            clipPath: toright
              ? "polygon(0% 0%, 50% 0%, 100% 100%, 0 100%)"
              : "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%)",
            transform:
              !toright &&
              "translateX(calc(var(--content-width) * (1 - var(--prog))))",
          },
        },
      },
    })
  ),
  ContentWrapper: styled("div")(({ theme }) => ({
    transition: "all 300ms 300ms",
    backgroundColor: theme.palette.mode === "light" ? "white" : "black",
    padding: "20px",
  })),
};
