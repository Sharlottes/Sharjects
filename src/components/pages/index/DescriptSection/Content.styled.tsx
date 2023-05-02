import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

export default {
  Shower: styled("div", {
    shouldForwardProp: (props) => props !== "toright",
  })<{
    toright: boolean;
    i: number;
  }>(({ theme, i, toright }) =>
    theme.unstable_sx({
      position: "absolute",
      alignSelf: toright ? "flex-end" : "flex-start",
      width: "max(500px, 45vw)",
      height: "99px",
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        opacity: 0,
        zIndex: -1,
        height: "inherit",
        border: "none",
        borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
        backgroundColor: (t) =>
          alpha(t.palette.primary.main, 0.6 + 0.2 * (2 - i)),
        transition: "opacity,border-right",
        transitionDuration: "100ms,100ms",
        transitionDelay: `${i * 0.25}s,${
          toright ? i * 0.1 + 0.5 : i * 0.25 + 1
        }s`,
        animationDelay: `${i * (toright ? 0.1 : 0.25)}s`,
        [`@keyframes move${i}${toright ? "r" : ""}`]: {
          "0%": {
            width: "calc(max(500px, 45vw) * 0)",
            transform: "translateX(calc(max(500px, 45vw) * 0))",
          },
          "50%": {
            width: `calc(max(500px, 45vw) * ${toright ? 0 : 1})`,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
            transform: "translateX(calc(max(500px, 45vw) * 0 - 1px))",
          },
          "100%": {
            width: `calc(max(500px, 45vw) * ${0.2 + 0.15 * i})`,
            clipPath: toright
              ? "polygon(0% 0%, 50% 0%, 100% 100%, 0 100%)"
              : "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%)",
            transform: toright
              ? "translateX(calc(max(500px, 45vw) * 0))"
              : `translateX(calc(max(500px, 45vw) * ${
                  1 - (0.2 + 0.15 * i)
                } - 1px))`,
          },
        },
      },
    })
  ),
  ContentContainer: styled(motion.div, {
    shouldForwardProp: (props) => props !== "toright",
  })<{
    toright: boolean;
  }>(({ theme, toright }) =>
    theme.unstable_sx({
      "--themedColor": theme.palette.mode === "light" ? "white" : "black",
      textAlign: "center",
      alignSelf: toright ? "flex-end" : "flex-start",
      width: "max(500px, 45vw)",
      height: "100px",
      border: "1px solid gray",
      borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
      backgroundColor: "var(--themedColor)",
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
          animationDuration: toright ? "0.5s" : "1s",
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
        },
        "& .shower:nth-of-type(1)::before": {
          animationName: `move0${toright ? "r" : ""}`,
        },
        "& .shower:nth-of-type(2)::before": {
          animationName: `move1${toright ? "r" : ""}`,
        },
        "& .shower:nth-of-type(3)::before": {
          animationName: `move2${toright ? "r" : ""}`,
        },
      },
    })
  ),
  ContentWrapper: styled("div")(({ theme }) => ({
    transition: "all 300ms 300ms",
    "--themedColor": theme.palette.mode === "light" ? "white" : "black",
    backgroundColor: "var(--themedColor)",
    padding: "20px",
  })),
};
