import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const ContentContainer = styled(motion.div)<{
  image: string;
}>(({ image }) => ({
  textAlign: "center",
  width: "100vw",
  height: "350px",
  backgroundImage: `url(${image})`,
  backgroundPosition: "-50px 400px",
  backgroundAttachment: "fixed",
  boxShadow: "inset 0 -50px 150px -50px #000",
}));

export const ContentBox = styled("div")(({ theme }) => ({
  "--themedColor": theme.palette.mode === "light" ? "white" : "black",
  height: "100px",
  transform: "translateY(-50px)",
  backdropFilter: "blur(20px)",
  filter: `drop-shadow(16px 16px 20px var(--themedColor))`,
  backgroundColor: alpha(
    theme.palette.mode === "light" ? "#ffffff" : "#000000",
    0.75
  ),
  padding: "20px",
  boxShadow: `0 0 30px var(--themedColor)`,
}));

export const EnterButton = styled(Button)({
  fontWeight: "bold",
  transform: "translateY(120px)",
});
