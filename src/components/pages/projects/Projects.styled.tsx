import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@mui/material/Card";
import styled from "@mui/system/styled";

export default {
  ProjectsContainer: styled("div")(({ theme }) => ({
    display: "grid",
    alignItems: "stretch",
    marginTop: "50px",
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
  })),
};
