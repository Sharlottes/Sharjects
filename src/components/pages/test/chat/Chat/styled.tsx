import styled from "@mui/system/styled";
import TextField from "@mui/material/TextField";

export const ChatBox = styled("div")({
  width: "350px",
  height: "500px",
  borderRadius: "5px",
  border: "1px solid lightgray",
});
export const StyledTextField = styled(TextField)({
  width: "100%",
  color: "lightgray",
  borderRadius: "5px",
  border: "1px solid lightgray",
});
export const ChatListContainer = styled("div")({
  height: "calc(100% - 56px)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
