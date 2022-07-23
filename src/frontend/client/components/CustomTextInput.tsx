import React from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Typography, Tooltip } from '@mui/material'

interface CustomTextInputProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  enable?: boolean
  name: string
  value: string
  privated?: boolean
  required?: boolean
  validate?: (value: string) => boolean
  errorMsg?: string
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  handleChange,
  value, name,
  errorMsg = "input required",
  enable = true,
  privated = false,
  required = true,
  validate = (value) => required && value !== ''
}) => {
  const [show, setShow] = React.useState(false)

  const isValid = validate(value)

  return (
    <Tooltip title="This input is required" disableHoverListener={!required}>
      <FormControl variant='standard' disabled={!enable}>
        <InputLabel htmlFor={`input-${name}`}>{name} {required ? '*' : ''}</InputLabel>
        <Input
          error={!isValid}
          id={`input-${name}`}
          type={privated
            ? (show ? 'text' : 'password')
            : 'text'
          }
          value={value}
          onChange={handleChange}
          endAdornment={
            <>{privated &&
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShow(prev => !prev)}
                  onMouseDown={evt => evt.preventDefault()}
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }</>
          }
        />
        {!isValid && (
          <Typography variant='caption' sx={{ ml: '10px', color: 'red' }}>{errorMsg}</Typography>
        )}
      </FormControl>
    </Tooltip>
  )
}

export default CustomTextInput