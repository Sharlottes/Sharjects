import styled from "@mui/system/styled";

export default {
  DescriptSectionContainer: styled("div")(({ theme }) => ({
    marginTop: "120px",
    "& .content > .MuiBox-root": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      "& h2": {
        transition: "margin 1s cubic-bezier(1,-1.56,0,2.03)",
        margin: "0px",
      },
      "&:hover": {
        "& h2": {
          margin: "0 30px",
        },
      },
    },
  })),

  ContentsBox: styled("div")({
    marginTop: "50px",
    width: "100%",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  }),
};
