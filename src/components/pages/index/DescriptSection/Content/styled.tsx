import Button from "@mui/material/Button";
import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const ContentContainer = styled(motion.div)<{
  image: string;
}>(({ image }) => ({
  textAlign: "center",
  width: "100vw",
  height: "250px",
  backgroundImage: `url(${image})`,
  backgroundPosition: "-110px 75px",
  backgroundAttachment: "fixed",
  boxShadow: "inset 0 -50px 150px -50px #000",
}));

export const ContentBox = styled("div")(({ theme }) => ({
  height: "100px",
  transform: "translateY(-50px)",
  backdropFilter: "blur(20px)",
  backgroundColor: theme.palette.mode === "light" ? "#ffffffa8" : "#000000a8",
  padding: "20px",
}));

export const EnterButton = styled(Button)({
  fontWeight: "bold",
  transform: "translateY(40px)",
});
