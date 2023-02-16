import React from "react";

import CredentialTextInput from "src/components/pages/auth/signin/CredentialSignIn/CredentialTextInput";
import Typography from "@mui/material/Typography";

import { isEmail } from "src/utils/isEmail";
import RememberButton from "./RememberButton";
import SubmitButtons from "./SubmitButtons";
import { SignInContainer, SignInContent, SignInTitle } from "./styled";

const LoginLabel = ({ username }: { username: string }) => (
  <>
    <span style={{ fontWeight: isEmail(username) ? "normal" : "bold" }}>
      Username
    </span>
    or
    <span style={{ fontWeight: isEmail(username) ? "bold" : "normal" }}>
      Email
    </span>
  </>
);

export interface State {
  username: string;
  password: string;
}

const CredentialSignIn: React.FC = () => {
  const [{ username, password }, setValues] = React.useState<State>({
    username: "",
    password: "",
  });

  const handleChange =
    (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [prop]: evt.target.value }));
    };

  return (
    <SignInContainer>
      <SignInTitle variant="h2" noWrap>
        Login User
      </SignInTitle>
      <SignInContent>
        <CredentialTextInput
          handleChange={handleChange("username")}
          inputKey="username-input"
          value={username}
          label={<LoginLabel username={username} />}
        />
        <CredentialTextInput
          handleChange={handleChange("password")}
          inputKey="password-input"
          value={password}
          label="Password"
          privated
        />
        <RememberButton />
        <SubmitButtons username={username} password={password} />
      </SignInContent>
    </SignInContainer>
  );
};
export default CredentialSignIn;
