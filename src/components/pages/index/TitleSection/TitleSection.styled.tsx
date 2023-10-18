import styled from "@mui/system/styled";

export default {
  KeywordShowerContainer: styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "10px auto",
    "& p": {
      color: theme.palette.primary.main,
      fontSize: "25px",
      fontFamily: "var(--font-nanum-pen-script)",
    },
  })),
};
