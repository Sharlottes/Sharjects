import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Typography, Tooltip, Link, Snackbar, Alert, Slide } from '@mui/material';
import React from 'react';
import Layout from 'src/pages/components/Layout';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import CustomTextInput from './components/CustomTextInput';
import { IAccount } from 'models/Account';
import { always } from 'src/utils/always';
import { initCasePartially } from 'src/utils/initCasePartially';

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

function LoginPage() {
  const [values, setValues] = React.useState<State>({
    id: '',
    password: ''
  });
  const { id, password } = values;
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>(SubmitStatus.READY);

  const handleChange = (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: evt.target.value });
  }

  const submitData = async () => {
    console.log(`id: ${id}, pw: ${password}`);

    await fetch(`/api/account?id=${id}`, { method: 'GET' })
      .then(res => always<Promise<IAccount[]>>(res.json(), console.log(res)))
      .then(([account]) => {
        console.log(account);
        if (account.password === password) {
          setSubmitStatus(SubmitStatus.DONE);
        } else {
          setSubmitStatus(SubmitStatus.FAILED);
        }
      })
      .catch((e) => {
        console.log(e);
        setSubmitStatus(SubmitStatus.FAILED);
      });
  }

  const isValid = id !== '' && password !== '';
  const isEnd = submitStatus === SubmitStatus.DONE || submitStatus === SubmitStatus.FAILED;

  return (
    <Layout>
      <Box flexDirection='column' sx={{ display: 'flex', alignItems: 'center', pt: '100px', justifyContent: 'center', minWidth: '100%', minHeight: '100%' }}>
        <Typography id='title' variant='h2' noWrap fontSize="min(6vw, 70px)">
          Login Account
        </Typography>

        <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)' }}>
          <CustomTextInput handleChange={handleChange('id')} value={values.id} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Id' />
          <CustomTextInput handleChange={handleChange('password')} value={values.password} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Password' privated />

          <Tooltip title={!isValid ? "you need to type into every required input"
            : {
              [SubmitStatus.READY]: 'login now!',
              [SubmitStatus.SUBMITTING]: 'processing...',
              [SubmitStatus.DONE]: 'done!',
              [SubmitStatus.FAILED]: 'failed!',
            }[submitStatus]
          }>
            <> {/*empty tag for wrapping disabled button to active tooltip*/}
              <LoadingButton
                disabled={!isValid}
                onClick={submitData}
                variant={isEnd ? "contained" : "outlined"}
                loading={submitStatus === SubmitStatus.SUBMITTING}
                loadingPosition='start'
                startIcon={
                  submitStatus === SubmitStatus.DONE ? <CheckIcon />
                    : submitStatus === SubmitStatus.FAILED ? <ErrorIcon />
                      : <AddIcon />
                }
                color={
                  initCasePartially<string>()(SubmitStatus, { // 와 아름답다 ㅋㅋㅋㅋ 그래 이거지
                    [SubmitStatus.DONE]: 'success',
                    [SubmitStatus.FAILED]: 'error',
                  })[submitStatus] ?? 'primary'
                }
                fullWidth
              >
                {
                  {
                    [SubmitStatus.READY]: 'Login',
                    [SubmitStatus.SUBMITTING]: 'processing...',
                    [SubmitStatus.DONE]: 'DONE!',
                    [SubmitStatus.FAILED]: 'RETRY!',
                  }[submitStatus]
                }
              </LoadingButton>
            </>
          </Tooltip>
          <Link href='/register'>
            <Typography variant='caption' sx={{ ml: '10px', fontWeight: 'bold', color: 'rgba(10, 107, 245, 0.9)' }}>
              create account
            </Typography>
          </Link>
        </Stack>

        <Snackbar
          autoHideDuration={100}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={submitStatus === SubmitStatus.DONE}
          TransitionComponent={p => <Slide {...p} appear={p.appear!} direction='right' />}
        >
          <Alert variant='filled' icon={<CheckIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>Login Successed!</Typography>
          </Alert>
        </Snackbar>

        <Snackbar
          autoHideDuration={100}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={submitStatus === SubmitStatus.FAILED}
          TransitionComponent={p => <Slide {...p} appear={p.appear!} direction='right' />}
        >
          <Alert variant='filled' severity='error'>
            <Typography sx={{ fontWeight: 'bold' }}>Login Failed!</Typography>
            <Typography>check if id or password is correctly typed</Typography>
            <Typography>or you can
              <Link href='/register' sx={{
                textDecoration: 'none',
                display: 'inline',
                marginLeft: '0.25em',
                fontWeight: 'bold',
                transition: 'all 0.25s',
                color: 'white',
                "&:hover": {
                  color: '#FFBA46'
                },
              }}>
                create new account!
              </Link>
            </Typography>
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  )
}

export default LoginPage;