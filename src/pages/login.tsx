import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, IconButton, Link, Slide, SlideProps, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Add, Check, Error, Close } from '@mui/icons-material';
import Layout from './components/Layout';
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
  FAILED,
}

interface SlideTransitionProps extends Omit<TransitionProps, 'children'>, React.HasChildren { }
const SlideTransition: React.PureFC<SlideTransitionProps> = (props) => <Slide {...props} appear />;

interface AlertSnackBarProps extends React.HasChildren {
  open: boolean;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  direction?: SlideProps['direction'];
  lifetime?: number;
}

const AlertSnackBar: React.FC<AlertSnackBarProps> = ({
  open, children,
  vertical = 'top', horizontal = 'left',
  direction = 'right',
  lifetime = 3000
}) => {
  const [closed, setClosed] = React.useState(false);
  const handleClose = () => setClosed(true);

  return (
    <Snackbar
      autoHideDuration={lifetime}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      transitionDuration={500}
      action={
        <IconButton sx={{ p: 0.5 }} onClick={handleClose}>
          <Close />
        </IconButton>
      }
    >
      {children}
    </Snackbar>
  )
}

function LoginPage() {
  const [values, setValues] = React.useState({
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
    <>
      <Layout>
        <Box flexDirection='column' sx={{ display: 'flex', alignItems: 'center', pt: '100px', justifyContent: 'center', minWidth: '100%', minHeight: '100%' }}>
          <Typography id='title' variant='h2' noWrap fontSize='min(6vw, 70px)'>
            Login Account
          </Typography>

          <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)' }}>
            <CustomTextInput handleChange={handleChange('id')} value={values.id} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Id' />
            <CustomTextInput handleChange={handleChange('password')} value={values.password} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Password' privated />

            <Tooltip title={
              !isValid
                ? 'you need to type into every required input'
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
                  variant={isEnd ? 'contained' : 'outlined'}
                  loading={submitStatus === SubmitStatus.SUBMITTING}
                  loadingPosition='start'
                  startIcon={
                    submitStatus === SubmitStatus.DONE ? <Check />
                      : submitStatus === SubmitStatus.FAILED ? <Error />
                        : <Add />
                  }
                  color={
                    initCasePartially<string>()(SubmitStatus, {
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
        </Box>
      </Layout>

      <AlertSnackBar
        open={submitStatus === SubmitStatus.DONE}
      >
        <Alert variant='filled' icon={<Check />}>
          <Typography sx={{ fontWeight: 'bold' }}>Login Successed!</Typography>
        </Alert>
      </AlertSnackBar>

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
              '&:hover': {
                color: '#FFBA46'
              },
            }}>
              create new account!
            </Link>
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginPage;