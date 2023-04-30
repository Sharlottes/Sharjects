import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export default {
  ColoredDoat: styled("div")(({ color }) => ({
    backgroundColor: color,
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    margin: "5px",
    cursor: "pointer",
  })),

  ColorSelectionContainer: styled("div")({
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    width: "300px",
  }),

  ColorSelectIndicator: styled(motion.div)({
    position: "absolute",
    width: "30px",
    height: "5px",
    backgroundColor: "#ffd37f",
  }),
};
