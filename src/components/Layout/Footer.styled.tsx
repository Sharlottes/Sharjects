import { Typography } from "@mui/material";
import styled from "@mui/system/styled";
import ThemeVariables from "src/core/ThemeVariables";

export default {
  FooterContainer: styled("footer")(({ theme }) =>
    theme.unstable_sx({
      width: "100%",
      minHeight: "100px",
      borderTop: "solid 1px #6666667f",
      backgroundColor: ThemeVariables.palette.themedWhite,
    })
  ),

  FooterBody: styled(Typography)(({ theme }) =>
    theme.unstable_sx({
      margin: "0 auto",
      p: "20px",
      width: "fit-content",
    })
  ),
};
