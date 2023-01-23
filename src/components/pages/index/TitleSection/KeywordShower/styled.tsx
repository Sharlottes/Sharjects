import styled from "@mui/system/styled";

export const KeywordShowerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "fit-content",
  margin: "0 auto",
  color: theme.palette.primary.main,
  "& p": {
    fontSize: "25px",
    fontFamily: "Nanum Pen Script",
  },
}));