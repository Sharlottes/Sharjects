import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface CredentialTextInputProps extends FormControlProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  inputKey: string;
  value: string;
  label: React.ReactNode;
  privated?: boolean;
  required?: boolean;
}

const CredentialTextInput: React.FC<CredentialTextInputProps> = ({
  handleChange,
  inputKey,
  value,
  label,
  privated = false,
  required = true,
  ...props
}) => {
  const [show, setShow] = React.useState(false);
  const isValid = required && value !== "";

  return (
    <FormControl variant="standard" {...props}>
      <InputLabel htmlFor={inputKey}>
        {label}
        {required && " *"}
      </InputLabel>
      <Input
        id={inputKey}
        error={!isValid}
        type={!privated || show ? "text" : "password"}
        value={value}
        onChange={handleChange}
        endAdornment={
          privated && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShow((prev) => !prev)}
                onMouseDown={(evt) => evt.preventDefault()}
              >
                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {!isValid && (
        <Typography sx={{ color: "red" }} variant="caption" ml="10px">
          input required
        </Typography>
      )}
    </FormControl>
  );
};

export default CredentialTextInput;
