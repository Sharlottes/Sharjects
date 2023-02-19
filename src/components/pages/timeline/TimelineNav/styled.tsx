import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import Layouts from "src/core/Layouts";

export const NavigatorShowButton = styled(motion.button)<{ color: string }>(
  ({ color }) => ({
    position: "absolute",
    right: "-30px",
    border: "none",
    color,
    boxShadow: "0 0 10px black",
    width: "36px",
    height: "36px",
    borderRadius: "18px",
    backgroundColor: "inherit",
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
  backgroundColor: "inherit",
  zIndex: Layouts.SIDE_MENU - 1,
  transform: "translateX(-110px)",
});
