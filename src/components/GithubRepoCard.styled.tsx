import styled from "@mui/system/styled";

export const ColoredDoat = styled("span")<{
  color: string;
}>(({ color }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "100%",
  backgroundColor: color,
  display: "inline-block",
  top: "1px",
  position: "relative",
}));
