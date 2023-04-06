import styled from "@mui/system/styled";

export const ColoredDoat = styled("div")(({ color }) => ({
  backgroundColor: color,
  width: "20px",
  height: "20px",
  borderRadius: "10px",
  margin: "5px",
  cursor: "pointer",
}));
