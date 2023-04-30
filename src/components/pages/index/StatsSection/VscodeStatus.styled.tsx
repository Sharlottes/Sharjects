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
  }),

  VSCodeStatusTitle: styled(Typography)({
    "& > span": {
      wordBreak: "break-all",
    },
  }),

  VSCodingImage: styled("img")({
    width: "70px",
    height: "70px",
    borderRadius: "15px",
    margin: "0 10px 10px 0",
  }),
};
