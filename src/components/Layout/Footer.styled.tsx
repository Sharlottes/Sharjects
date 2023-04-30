import { Typography } from "@mui/material";
import styled from "@mui/system/styled";

import Colorf from "src/utils/Colorf";

export default {
  FooterContainer: styled("footer")(({ theme }) =>
    theme.unstable_sx({
      width: "100%",
      minHeight: "100px",
      borderTop: "solid 1px #6666667f",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? Colorf.getComplementaryColor("#e6e6e6")
          : "#e6e6e6",
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
