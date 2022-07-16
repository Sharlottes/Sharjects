import { VisibilityOff, Visibility } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, InputLabel, Input, Box, Stack, Typography, IconButton, InputAdornment, Tooltip } from '@mui/material';
import React from 'react';
import Layout from 'src/pages/components/Layout';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

interface State {
  id: string;
  password: string;
  showPassword: boolean;
  submitting: SubmitStatus;
}

enum SubmitStatus {
  READY,
  SUBMITTING,
  DONE,
  FAILED
}

//TODO: make login page
function LoginPage() {
  const [values, setValues] = React.useState<State>({
    id: '',
    password: '',
    showPassword: false,
    submitting: SubmitStatus.READY
  });
  const { id, password, showPassword, submitting } = values;

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  }
  
  const submitData = async () => {
    if(isEnd()) return;
    /*
    console.log(`id: ${id}, pw: ${password}`);
    setValues({ ...values, submitting: SubmitStatus.SUBMITTING });
    const res = await fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password
      })
    });
    if(res.status === 200) {
      setValues({ ...values, submitting: SubmitStatus.DONE });
    } else {
      setValues({ ...values, submitting: SubmitStatus.FAILED });
    }
    console.log(res);
    */
    setValues({ ...values, submitting: SubmitStatus.DONE });
  }

  const isValid = () => Boolean(id) && Boolean(password);
  const isEnd = () => submitting === SubmitStatus.DONE || submitting === SubmitStatus.FAILED;

  return (
    <Layout>
      <Box flexDirection='column' sx={{display: 'flex', alignItems:'center', pt: '100px', justifyContent: 'center', minWidth: '100%', minHeight: '100%'}}>
        <Typography id='title' variant='h2' noWrap fontSize="min(6vw, 70px)">Register Account</Typography>
        <Stack direction='column' spacing={1} sx={{mt: '20px', mb: '20px', width: 'min(70vw, 300px)'}}>
          <FormControl variant="standard" disabled={submitting !== SubmitStatus.READY}>
            <InputLabel htmlFor="id-input">ID</InputLabel>
            <Input error={!id} id='id-input' type='text' value={id} onChange={handleChange('id')}/>
            {!id && <Typography variant='caption' sx={{ml: '10px', color: 'red'}}>input required</Typography>}
          </FormControl>
          
          <FormControl variant="standard" disabled={submitting !== SubmitStatus.READY}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input 
              error={!password} 
              id='password-input' 
              type={showPassword ? 'text' : 'password'}
              value={password} 
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=>setValues(prev=>({...prev, showPassword: !prev.showPassword}))}
                    onMouseDown={e=>e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!password && <Typography variant='caption' sx={{ml: '10px', color: 'red'}}>input required</Typography>}
          </FormControl>

          <Tooltip title={!isValid() 
            ? "you need to type into every required input"
            : submitting === SubmitStatus.READY 
              ? "submit now!"
              : submitting === SubmitStatus.SUBMITTING 
                ? "submitting..."
                : submitting === SubmitStatus.DONE
                  ? "done!"
                  : "failed!"
          }>
          <Box>
            <LoadingButton 
              disabled={!isValid()}
              disableElevation={isEnd()}
              disableFocusRipple={isEnd()}
              disableRipple={isEnd()}
              loading={submitting === SubmitStatus.SUBMITTING} 
              loadingPosition='start' 
              variant={isEnd() ? "contained" : "outlined"}
              startIcon={submitting === SubmitStatus.DONE ? <CheckIcon /> : submitting === SubmitStatus.FAILED ? <ErrorIcon /> : <AddIcon />} 
              onClick={submitData}
              sx={{
                width: '100%', 
                ...((isEnd()) && {cursor: 'not-allowed'})
              }}
              color={ submitting === SubmitStatus.DONE ? 'success' : submitting === SubmitStatus.FAILED ? 'error' : 'primary' }
            >
              {submitting === SubmitStatus.SUBMITTING ? "Submitting..." : submitting === SubmitStatus.FAILED ? 'Failed!' : submitting === SubmitStatus.DONE ? "DONE!" : "Submit"}
            </LoadingButton>
          </Box>
          </Tooltip>
        </Stack>
      </Box>
    </Layout>
  )
} 

export default LoginPage;