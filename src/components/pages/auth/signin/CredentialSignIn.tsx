import React from "react";

import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import Typography from "@mui/material/Typography";

import {
  CredentialIdInput,
  CredentialPasswordInput,
} from "src/components/pages/auth/signin/CredentialInput";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import S from "./CredentialSignIn.styled";
import U from "./CredentialSignIn.util";

export interface State {
  username: string;
  password: string;
}

const CredentialSignIn: React.FC = () => {
  const [{ username, password }, setValues] = React.useState<State>({
    username: "",
    password: "",
  });
  const [remember, setRemember] = React.useState(false);
  const { loginuser, registerUser } = U.useSignUser(username, password);

  const handleChange =
    (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [prop]: evt.target.value }));
    };

  return (
    <S.SignInContainer>
      <Typography variant="h2" noWrap>
        Login User
      </Typography>
      <S.SignInContent>
        <CredentialIdInput
          onChange={handleChange("username")}
          value={username}
        />
        <CredentialPasswordInput
          onChange={handleChange("password")}
          value={password}
        />
        <S.RememberButton
          remember={remember}
          onClick={() => setRemember((prev) => !prev)}
          color="inherit"
        >
          <CheckBoxRoundedIcon color="primary" />
          <CheckBoxOutlineBlankRoundedIcon />
          Remember User
        </S.RememberButton>
        {(
          [
            [loginuser, "Sign In"],
            [registerUser, "Register"],
          ] as const
        ).map(([onClick, label], i) => (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={!(username !== "" && password !== "")}
            startIcon={<AddIcon />}
            onClick={onClick}
          >
            {label}
          </Button>
        ))}
      </S.SignInContent>
    </S.SignInContainer>
  );
};
export default CredentialSignIn;
