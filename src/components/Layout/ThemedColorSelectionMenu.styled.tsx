import styled from "@mui/system/styled";
import { motion } from "framer-motion";

namespace S {
  export const ColoredDoat = styled("div")(({ color }) => ({
    backgroundColor: color,
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    margin: "5px",
    cursor: "pointer",
  }));

  export const ColorSelectionContainer = styled("div")({
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    width: "300px",
  });

  export const ColorSelectIndicator = styled(motion.div)({
    position: "absolute",
    width: "30px",
    height: "5px",
    backgroundColor: "#ffd37f",
  });
}

export default S;
