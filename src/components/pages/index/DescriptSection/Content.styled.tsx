import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

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
