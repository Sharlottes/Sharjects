import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

export default {
  SignInContainer: styled("div")({
    marginTop: "100px",
    minWidth: "100%",
    minHeight: "100%",
    "& .MuiTypography-h2": {
      fontSize: "min(6vw, 70px)",
      textAlign: "center",
    },
  }),

  SignInContent: styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: 1,
    margin: "20px auto",
    width: "min(70vw, 300px)",
    "& .MuiTypography-caption": {
      color: "red",
      marginLeft: "5px",
    },
  }),

  RememberButton: styled(Button, {
    shouldForwardProp: (props) => props !== "remember",
  })<{ remember: boolean }>(({ remember }) => ({
    justifyContent: "flex-start",
    alignItems: "center",
    verticalAlign: "middle",
    margin: 0,
    padding: 0,
    "& svg": {
      "&:nth-of-type(1)": {
        opacity: remember ? 0 : 1,
      },
      "&:nth-of-type(2)": {
        opacity: remember ? 1 : 0,
        position: "absolute",
      },
      transition: "all 0.25s",
    },
  })),
};
