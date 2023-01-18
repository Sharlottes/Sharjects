import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const DescriptSectionContainer = styled("div")({
  marginTop: "120px",
});

export const TitleBox = styled(motion.div)({
  margin: "10px",
  "& > p": {
    margin: "0 1vw 0 5vw",
  },
});

export const ContentsBox = styled("div")({
  width: "100%",
  padding: "20px 0",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
});
