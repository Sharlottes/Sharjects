import Button from "@mui/material/Button";
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
    backgroundImage: `url(${image})`,
    animation: "move",
    "@keyframes move": {
      "0%": {
        transform: "translateX(0%)",
      },
      "50%": {
        transform: "translateX(100%)",
      },
      "100%": {
        transform: "translateX(0%)",
      },
    },
  })
);

export const ContentBox = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: "white",
}));

export const EnterButton = styled(Button)({
  fontWeight: "bold",
  transform: "translateY(120px)",
});
