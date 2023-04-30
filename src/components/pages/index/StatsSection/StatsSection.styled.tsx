import styled from "@mui/system/styled";

export default {
  StatusContainer: styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    [theme.breakpoints.up("md")]: {
      "& > *": { flex: 1 },
    },
  })),
  StatsSectionContainer: styled("div")({
    marginTop: "120px",
  }),
};
