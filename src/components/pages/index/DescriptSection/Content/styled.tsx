import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const ContentContainer = styled(motion.div)({
  minHeight: "150px",
  width: "min(900px, 100%)",
  borderRadius: "20px",
  border: "1px solid lightgray",
  boxShadow: "0 0 10px",
});

export const ContentContainerTop = styled("div")<{
  image: string;
  isMobile: boolean;
}>(({ image, isMobile }) => ({
  height: "100%",
  borderRadius: isMobile ? "20px 20px 0 0" : "20px",
  backgroundImage: `url(${image})`,
  backgroundSize: "70%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0% 40%",
  "& > p": {
    position: "relative",
    left: "30px",
  },
}));

export const ContentBoxWrapper = styled("div")<{
  isMobile: boolean;
}>(({ isMobile }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "end",
  borderRadius: isMobile ? "20px 20px 0 0" : "20px",
  backdropFilter: "blur(3px)",
  filter: "drop-shadow(-5px 0 3px)",
  clipPath: "polygon(100% 100%, 100% 0, 0 0, 0% 100%)",
}));

export const ContentBox = styled("div")<{
  isMobile: boolean;
}>(({ isMobile, theme }) => ({
  width: "70%",
  padding: "20px",
  zIndex: 10,
  paddingLeft: "15%",
  backgroundColor: theme.palette.mode === "light" ? "white" : "rgb(18, 18, 18)",
  borderRadius: isMobile ? "0 20px 0 0" : "0 20px 20px 0",
  clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
}));

export const EnterButtonContainer = styled("div")({
  "& button": {
    "--size": "30px",
    width: "var(--size)",
    height: "var(--size)",
    borderRadius: "calc(var(--size))",
  },
  "& a": {
    height: "24px",
  },
  "& span": {
    transition: "all 250ms",
    position: "absolute",
    opacity: 0,
    marginLeft: "-20px",
  },
  "&:hover": {
    "& span": {
      opacity: 1,
      marginLeft: "0px",
    },
  },
});
