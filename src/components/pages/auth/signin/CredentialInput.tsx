import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { isEmail } from "src/utils/isEmail";

export interface CredentialInputProps {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const CredentialIdInput: React.FC<CredentialInputProps> = ({
  onChange,
  value,
}) => (
  <FormControl variant="standard">
    <InputLabel htmlFor="username-input">
      <span style={{ fontWeight: isEmail(value) ? "normal" : "bold" }}>
        Username
      </span>
      or
      <span style={{ fontWeight: isEmail(value) ? "bold" : "normal" }}>
        Email
      </span>
      &nbsp;*
    </InputLabel>
    <Input
      id="username-input"
      error={!value}
      type="text"
      value={value}
      onChange={onChange}
    />
    {!value && <Typography variant="caption">input required</Typography>}
  </FormControl>
);

export const CredentialPasswordInput: React.FC<CredentialInputProps> = ({
  onChange,
  value,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="password-input">{"Password *"}</InputLabel>
      <Input
        id="password-input"
        error={!value}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShow((prev) => !prev)}
              onMouseDown={(evt) => evt.preventDefault()}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!value && <Typography variant="caption">input required</Typography>}
    </FormControl>
  );
};
