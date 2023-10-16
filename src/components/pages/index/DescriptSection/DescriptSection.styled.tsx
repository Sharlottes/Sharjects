import styled from "@mui/system/styled";

export default {
  DescriptSectionContainer: styled("div")({
    marginTop: "24px",
    "& .content > .MuiBox-root": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  }),
  ContentsBox: styled("div")({
    width: "100%",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  }),
};
