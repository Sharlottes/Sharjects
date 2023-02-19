import { signIn } from "next-auth/react";

import CloseIcon from "@mui/icons-material/Close";
import { type SnackbarKey, useSnackbar } from "notistack";
import { SignInButton, CloseButton } from "./styled";

export interface LoginSnackbarActionProps {
  snackbarKey?: SnackbarKey | undefined;
}
const LoginSnackbarAction: React.FC<LoginSnackbarActionProps> = ({
  snackbarKey,
}) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <>
      <SignInButton onClick={() => signIn()}>Log In</SignInButton>
      <CloseButton
        onClick={() => {
          closeSnackbar(snackbarKey);
          localStorage.setItem(
            "alert_expire",
            (Date.now() + 1000 * 60 * 60 * 24 * 3).toString()
          );
        }}
      >
        <CloseIcon />
      </CloseButton>
    </>
  );
};
export default LoginSnackbarAction;
