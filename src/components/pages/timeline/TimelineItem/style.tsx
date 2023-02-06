import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const TimeConnecter = styled(motion.span)({
  borderLeft: "solid 1px #bdbdbd",
  minHeight: "24px",
});

export const TimeContent = styled("div")({
  marginLeft: "10px",
  padding: "20px",
  width: "fit-content",
  border: "1px solid #fcfcfc",
  borderRadius: "20px",
});
export const Header = styled("span")({
  color: "themedBlack",
  fontFamily: "bold",
  fontSize: 35,
});
export const DummyHeader = styled("span")({
  fontSize: 5,
  color: "#9e9e9e",
});
