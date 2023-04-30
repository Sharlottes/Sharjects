import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export default {
  VSCodeStatusContainer: styled("div")({
    minWidth: "100%",
    maxWidth: "300px",
  }),

  VSCodeStatusConent: styled("div")({
    display: "flex",
    alignItems: "center",
    "& img": {
      borderRadius: "15px",
      margin: "0 10px 10px 0",
    },
    "& span": {
      wordBreak: "break-all",
    },
  }),
};
