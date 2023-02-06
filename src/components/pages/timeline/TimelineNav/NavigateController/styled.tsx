import styled from "@mui/system/styled";

export const NavigateContainer = styled("div")({
  textAlign: "center",
});
export const NavigateItem = styled("div")<{ current: boolean }>(
  ({ current }) => ({
    margin: "5px 2px",
    color: current ? "red" : "inherit",
    cursor: "pointer",
  })
);

export const NavigateItemDivider = styled("div")<{ show: boolean }>(
  ({ show }) => ({
    margin: "0px auto",
    backgroundColor: "#bdbdbd",
    height: "12px",
    width: "2px",
    visibility: show ? "inherit" : "hidden",
  })
);
