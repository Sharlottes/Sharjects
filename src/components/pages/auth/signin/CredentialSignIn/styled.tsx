import Button from "@mui/material/Button";
import styled from "@mui/system/styled";

export const StyledButton = styled(Button)((props) => (
  <Button variant="outlined" color="primary" fullWidth {...props} />
));

export const CredentialContainer = styled("div")({
  marginTop: "100px",
  minWidth: "100%",
  minHeight: "100%",
});

export const CredentialContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  margin: "20px 0",
  width: "min(70vw, 300px)",
});
