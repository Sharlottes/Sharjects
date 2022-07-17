import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Typography } from "@mui/material";
import React from "react";

interface CustomTextInputProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  enable?: boolean;
  name: string;
  value: string;
  privated?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  handleChange,
  value, name,
  enable = true,
  privated = false
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <FormControl variant="standard" disabled={!enable}>
      <InputLabel htmlFor={`input-${name}`}>{name}</InputLabel>
      <Input
        error={!value}
        id={`input-${name}`}
        type={privated
          ? (show ? 'text' : 'password')
          : 'text'
        }
        value={value}
        onChange={handleChange}
        endAdornment={
          <>{privated &&
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShow(prev => !prev)}
                onMouseDown={evt => evt.preventDefault()}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }</>
        }
      />
      {!value && <Typography variant='caption' sx={{ ml: '10px', color: 'red' }}>input required</Typography>}
    </FormControl>
  )
}

export default CustomTextInput;