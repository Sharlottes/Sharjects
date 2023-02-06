import styled from "@mui/system/styled";
import { motion, type HTMLMotionProps } from "framer-motion";
import Layouts from "src/core/Layouts";

export const NavigatorShowButton = styled(motion.button)<{ showed: boolean }>(
  ({ showed }) => ({
    position: "absolute",
    right: "-30px",
    border: "none",
    color: showed ? "#666666" : "lightgray",
    boxShadow: "0 0 10px black",
    width: "36px",
    height: "36px",
    borderRadius: "18px",
    transition: "color 250ms",
  })
);

export const NavigatorContainer = styled(motion.div)({
  position: "fixed",
  top: "calc(50%, fit-content)",
  padding: "10px",
  height: "fit-content",
  boxShadow: "0 0 10px black",
  borderRadius: "10px",
  backgroundColor: "white",
  zIndex: Layouts.SIDE_MENU - 1,
  transform: "translateX(-110px)",
});
