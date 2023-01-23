import AddIcon from "@mui/icons-material/Add";

import useShowAlert from "src/hooks/useShowAlert";
import type { State } from ".";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { isEmail } from "src/utils/isEmail";
import { StyledButton } from "./styled";

const SubmitButtons: React.FC<State> = ({ username, password }) => {
  const showAlert = useShowAlert();
  const { query } = useRouter();

  const loginuser = async () => {
    const res = await signIn("credentials", {
      callbackUrl: query.callbackUrl?.toString() ?? "/",
      [isEmail(username) ? "email" : "username"]: username,
      password,
    });

    const errorMsg = res?.error ?? query.error;
    if (!errorMsg || errorMsg === "SessionRequired") return;
    showAlert(errorMsg.toString(), "error");
  };
  const registerUser = async () => {
    const { message } = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    showAlert(message, message === "success" ? "success" : "warning");
    if (message === "success") loginuser();
  };

  return (
    <>
      <StyledButton
        onClick={loginuser}
        startIcon={<AddIcon />}
        disabled={!(username !== "" && password !== "")}
      >
        Sign In
      </StyledButton>
      <StyledButton
        onClick={registerUser}
        startIcon={<AddIcon />}
        disabled={!(username !== "" && password !== "")}
      >
        Register
      </StyledButton>
    </>
  );
};
export default SubmitButtons;
