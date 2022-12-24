import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@mui/material/Card";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

export const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  transform: "scale(0.8)",
  color: "lightgray",
  transition: "color 300ms ease-out",
  "&:hover": {
    color: "text.primary",
  },
});

export const ProjectsContainer = styled(motion.div)(({ theme }) => ({
  display: "grid",
  alignItems: "stretch",
  gap: "20px",
  padding: "0 20px",
  [theme.breakpoints.between("xs", "sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
  [theme.breakpoints.between("sm", "md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.between("md", "lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.between("lg", 1400)]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  [theme.breakpoints.between(1400, 1650)]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
  [theme.breakpoints.up(1650)]: {
    gridTemplateColumns: "repeat(6, 1fr)",
  },
}));

export const ProjectCard = styled(Card)(({ theme }) =>
  theme.unstable_sx({
    borderRadius: "20px",
    border: "1px solid #dcdcdc",
    minWidth: "250px",
    height: "100%",
    transition: "all 250ms ease-in",
    display: "grid",
    flexDirection: "column",
    justifyContent: "space-between",
    gridTemplateColumns: "1fr",
    "& .MuiDivider-root": {
      transition: "width,background-color",
      transitionDuration: "250ms",
      transitionDelay: "0ms,250ms",
      width: 0,
      backgroundColor: "gray",
    },
    "& .link-btn": {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      float: "right",
      "& div": {
        transition: "opacity 500ms",
        opacity: 0,
      },
      "& :nth-of-type(1)": {
        width: 24,
        height: 24,
      },
      "& :nth-of-type(2)": {
        width: "60px",
        height: "30px",
        borderRadius: "20px",
        border: "1px solid #dcdcdc",
        padding: "2px 10px",
        transition: "opacity,color 500ms,500ms",
        transitionDuration: "500ms",
        color: "themedBlack",
        whiteSpace: "nowrap",
        [theme.breakpoints.down("md")]: {
          "&:nth-of-type(2)": {
            color: "white",
            "&::before": {
              opacity: 1,
            },
          },
        },
        "& a": {
          position: "absolute",
        },
        "&:hover": {
          color: "white",
          "&::before": {
            opacity: 1,
          },
        },
        "&::before": {
          content: "''",
          position: "absolute",
          width: "inherit",
          height: "inherit",
          borderRadius: "20px",
          backgroundImage: "linear-gradient(30deg, #50d4d9, #b662c4)",
          transition: "opacity 500ms",
          opacity: 0,
          transform: "translateX(-10px) translateY(-2px)",
        },
      },
    },
    "& .collapse-bar": {
      width: "100%",
      height: "100%",
      textAlign: "center",
      color: "#777777",
      gridColumnStart: 1,
      gridRowStart: 1,
      alignSelf: "flex-end",
      pointerEvents: "none",
      opacity: 0,
      transition: "opacity,transform",
      transitionDuration: "100ms,250ms",
      transitionDelay: "125ms",
      transitionTimingFunction: "ease,cubic-bezier(.01,1.76,.67,.79)",
      "&>div": {
        backgroundColor: "black",
        padding: "15px 10px 10px 10px",
        boxShadow: "inset 0 7px 7px #777777",
        height: "100%",
        pointerEvents: "fill",
        "&>div": {
          height: "100%",
        },
      },
    },
    "&:hover": {
      boxShadow: "0 0 10px black",
      "& .MuiDivider-root": {
        width: "100%",
        backgroundColor: "#a9d8ff",
      },
      "& .link-btn": {
        "& >div": {
          opacity: 1,
        },
      },
      "& .collapse-bar": {
        opacity: 1,
        transform: "translateY(80%)",
      },
    },
  })
);
