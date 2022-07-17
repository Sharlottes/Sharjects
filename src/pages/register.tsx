import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import React from 'react';
import Layout from 'src/pages/components/Layout';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import CustomTextInput from './components/CustomTextInput';

interface State {
  id: string;
  password: string;
}

enum SubmitStatus {
  READY,
  SUBMITTING,
  DONE,
  FAILED
}

//TODO: make login page
function RegisterPage() {
  const [ values, setValues ] = React.useState<State>({ id: '', password: '' });
  const { id, password } = values;
  const [ submitStatus, setSubmitStatus ] = React.useState<SubmitStatus>(SubmitStatus.READY);

  const handleChange = (prop: keyof State) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: evt.target.value });
    };
  
  const submitData = async () => {
    /*
    console.log(`id: ${id}, pw: ${password}`);
    setValues({ ...values, submitStatus: SubmitStatus.SUBMITTING });
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
      setSubmitStatus(SubmitStatus.DONE);
    } else {
      setSubmitStatus(SubmitStatus.FAILED);
    }
    console.log(res);
    */
    setSubmitStatus(SubmitStatus.DONE);
  };

  const isValid = id !== '' && password !== '';
  const isEnd = submitStatus === SubmitStatus.DONE || submitStatus === SubmitStatus.FAILED;

  return (
    <Layout>
      <Box 
        flexDirection='column' 
        sx={{
          display: 'flex', 
          alignItems: 'center', 
          pt: '100px', 
          justifyContent: 'center', 
          minWidth: '100%',
          minHeight: '100%'
        }}
      >
        <Typography id='title' variant='h2' noWrap fontSize="min(6vw, 70px)">Register Account</Typography>
        <Stack direction='column' spacing={1} sx={{mt: '20px', mb: '20px', width: 'min(70vw, 300px)'}}>
          <CustomTextInput
            handleChange={handleChange('id')}
            value={values.id}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            name='Id'
          />
          <CustomTextInput
            handleChange={handleChange('password')}
            value={values.password}
            enable={submitStatus !== SubmitStatus.SUBMITTING}
            name='Password'
            privated
          />


          <Tooltip title={!isValid ? "you need to type into every required input"
            : submitStatus === SubmitStatus.READY ? "submit now!"
            : submitStatus === SubmitStatus.SUBMITTING ? "submitting..."
            : submitStatus === SubmitStatus.DONE ? "done!"
            : "failed!"
          }>
          <Box>
            <LoadingButton 
              disabled={!isValid}
              loading={submitStatus === SubmitStatus.SUBMITTING} 
              loadingPosition='start' 
              variant={isEnd ? "contained" : "outlined"}
              startIcon={
                submitStatus === SubmitStatus.DONE ? <CheckIcon /> 
                : submitStatus === SubmitStatus.FAILED ? <ErrorIcon /> 
                : <AddIcon />
              } 
              onClick={submitData}
              color={ 
                submitStatus === SubmitStatus.DONE ? 'success' 
                : submitStatus === SubmitStatus.FAILED ? 'error' 
                : 'primary' 
              }
              sx={{ width: '100%' }}
            >
              {
                submitStatus === SubmitStatus.SUBMITTING ? "Submitting..." 
                : submitStatus === SubmitStatus.FAILED ? 'Failed!' 
                : submitStatus === SubmitStatus.DONE ? "DONE!" 
                : "Submit"
              }
            </LoadingButton>
          </Box>
          </Tooltip>
        </Stack>
      </Box>
    </Layout>
  )
} 

export default RegisterPage;