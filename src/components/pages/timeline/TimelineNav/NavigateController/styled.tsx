import styled from "@mui/system/styled";

export default {
  NavigateContainer: styled("div")({
    textAlign: "center",
  }),
  NavigateItem: styled("div")<{ current: boolean }>(({ current }) => ({
    margin: "5px 2px",
    color: current ? "red" : "inherit",
    cursor: "pointer",
  })),

  NavigateItemDivider: styled("div")<{ show: boolean }>(({ show }) => ({
    margin: "0px auto",
    backgroundColor: "#bdbdbd",
    height: "12px",
    width: "2px",
    visibility: show ? "inherit" : "hidden",
  })),
};
