import { signIn } from "next-auth/react";

import CloseIcon from "@mui/icons-material/Close";
import { type SnackbarKey, useSnackbar } from "notistack";
import { SignInButton, CloseButton } from "./styled";

export interface LoginSnackbarActionProps {
  key?: SnackbarKey | undefined;
}
const LoginSnackbarAction: React.FC<LoginSnackbarActionProps> = ({ key }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <>
      <SignInButton onClick={() => signIn()}>Log In</SignInButton>
      <CloseButton onClick={() => closeSnackbar(key)}>
        <CloseIcon />
      </CloseButton>
    </>
  );
};
export default LoginSnackbarAction;
