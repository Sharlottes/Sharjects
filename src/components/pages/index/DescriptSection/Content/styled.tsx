import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const ContentContainer = styled(motion.div)<{
  toRight: boolean;
  image: string;
}>(({ theme, toRight, image }) =>
  theme.unstable_sx({
    textAlign: "center",
    alignSelf: toRight ? "flex-end" : "flex-start",
    width: "45vw",
    border: "1px solid gray",
    borderRadius: toRight ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
    "--themedColor": theme.palette.mode === "light" ? "white" : "black",
    backgroundColor: "white",
    transition: "box-shadow 500ms",
    "&::before": {
      content: "''",
      display: "block",
      position: "fixed",
      width: "100%",
      height: "80%",
      left: 0,
      right: 0,
      opacity: 0,
      zIndex: -1,
      transition: "all 300ms",
      backdropFilter: "blur(10px)",
      borderRadius: toRight ? "20px 1px 1px 20px" : "1px 20px 20px 1px",
      backgroundImage: `url(${image})`,
      animation: "imageMove 5s linear 0s infinite alternate",
      backgroundRepeat: "no-repeat",
      backgroundSize: "200%",
    },
    "&:hover": {
      color: "gray",
      boxShadow: `${toRight ? "-8px" : "8px"} 8px 15px`,
      "&::before": {
        opacity: 1,
        filter: "blur(10px)",
      },
      "& > div": {
        transition: "all 300ms 0ms",
        backgroundColor: "rgba(0,0,0,0)",
      },
    },
    "@keyframes imageMove": {
      "0%": {
        backgroundPosition: "0% 20%",
      },
      "50%": {
        backgroundPosition: "50% 70%",
      },
      "100%": {
        backgroundPosition: "100% 20%",
      },
    },
  })
);

export const ContentWrapper = styled("div")({
  transition: "all 300ms 300ms",
  backgroundColor: "white",
  padding: "20px",
});
