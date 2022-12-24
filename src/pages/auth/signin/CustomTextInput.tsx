import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { CustomNextPage } from "src/pages/_app";

export interface CustomTextInputProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  enable?: boolean; //default enable
  value: string; //default value
  label: React.ReactNode | ((value: string) => React.ReactNode); //input title
  cons?: [(value: string) => boolean, string][]; //cons, error message
  privated?: boolean; //whether input is private like password
  required?: boolean; //whether input required
}

const CustomTextInput: CustomNextPage<CustomTextInputProps> = ({
  handleChange,
  value,
  label,
  enable = true,
  privated = false,
  required = true,
  cons = required
    ? [[(value: string) => required && value !== "", "input required"]]
    : [],
}) => {
  const [show, setShow] = React.useState(false);

  const isValid = cons.every((c) => c[0](value));

  return (
    <FormControl variant="standard" disabled={!enable}>
      <InputLabel htmlFor={`input`}>
        {typeof label === "function" ? label(value) : label}{" "}
        {required ? "*" : ""}
      </InputLabel>
      <Input
        error={!isValid}
        id="input"
        type={privated ? (show ? "text" : "password") : "text"}
        value={value}
        onChange={handleChange}
        endAdornment={
          <>
            {privated && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShow((prev) => !prev)}
                  onMouseDown={(evt) => evt.preventDefault()}
                >
                  {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )}
          </>
        }
      />
      {!isValid &&
        cons.reduce(
          (a, [con, errmsg], i) =>
            con(value)
              ? a
              : [
                  ...a,
                  <Typography key={i} variant="caption" ml="10px">
                    <span color="red">{errmsg}</span>
                  </Typography>,
                ],
          [<div key="empty" />]
        )}
    </FormControl>
  );
};

CustomTextInput.notPage = true;

export default CustomTextInput;
