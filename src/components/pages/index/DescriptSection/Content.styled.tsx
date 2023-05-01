import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export default {
  ContentContainer: styled(motion.div, {
    shouldForwardProp: (props) => props !== "toright",
  })<{
    toright: boolean;
  }>(({ theme, toright }) =>
    theme.unstable_sx({
      textAlign: "center",
      alignSelf: toright ? "flex-end" : "flex-start",
      width: "max(500px, 45vw)",
      border: "1px solid gray",
      borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
      "--themedColor": theme.palette.mode === "light" ? "white" : "black",
      backgroundColor: "var(--themedColor)",
      transition: "box-shadow 500ms",
      "& > img": {
        pointerEvents: "none",
        position: "absolute",
        width: "max(500px, 45vw) !important",
        opacity: 0,
        filter: "blur(10px)",
        zIndex: -1,
        transition: "all 300ms",
        borderRadius: toright ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
        animation: "imageMove 5s linear 0s infinite alternate",
      },
      "&:hover": {
        color: "gray",
        boxShadow: `${toright ? "-8px" : "8px"} 8px 15px`,
        "& > img": {
          opacity: 1,
        },
        "& > div": {
          transition: "all 300ms",
          backgroundColor: "rgba(0,0,0,0)",
        },
      },
      "@keyframes imageMove": {
        "0%": {
          objectPosition: "0% 20%",
        },
        "50%": {
          objectPosition: "50% 70%",
        },
        "100%": {
          objectPosition: "100% 20%",
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
