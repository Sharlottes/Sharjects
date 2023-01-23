import { signIn } from "next-auth/react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { type SnackbarKey, useSnackbar } from "notistack";

export interface LoginSnackbarActionProps {
  key?: SnackbarKey | undefined;
}
const LoginSnackbarAction: React.FC<LoginSnackbarActionProps> = ({ key }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <>
      <Button
        onClick={() => signIn()}
        sx={{
          transition:
            "color,background-color 200ms cubic-bezier(.17,1.78,.74,-1.02)",
          color: "primary.main",
          "&:hover": {
            color: "white",
            backgroundColor: "primary.main",
          },
        }}
      >
        Log In
      </Button>
      <IconButton
        onClick={() => closeSnackbar(key)}
        sx={{
          transition: "color 200ms",
          "&:hover": { color: "primary.main" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
};
export default LoginSnackbarAction;
