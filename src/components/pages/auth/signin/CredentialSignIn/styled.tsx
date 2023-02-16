import { Typography } from "@mui/material";
import Button, { type ButtonProps } from "@mui/material/Button";
import styled from "@mui/system/styled";

export const StyledButton: React.FC<ButtonProps> = (props) => (
  <Button variant="outlined" color="primary" fullWidth {...props} />
);

export const SignInContainer = styled("div")({
  marginTop: "100px",
  minWidth: "100%",
  minHeight: "100%",
});

export const SignInTitle = styled(Typography)({
  fontSize: "min(6vw, 70px)",
  textAlign: "center",
});

export const SignInContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  margin: "20px auto",
  width: "min(70vw, 300px)",
});
