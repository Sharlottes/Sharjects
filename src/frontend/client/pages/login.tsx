import React from 'react'
import Router from 'next/router'
import * as NotiStack from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, IconButton, Link, Stack, Tooltip, Typography, Button } from '@mui/material'
import Layout from 'src/frontend/client/components/Layout'
import CustomTextInput from 'src/frontend/client/components/CustomTextInput'
import { IAccount } from 'models/Account'
import { always } from 'src/utils/always'
import { initCasePartially } from 'src/utils/initCasePartially'
import UserContext from 'src/frontend/client/contexts/UserContext'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'

import { Add, Check, Error, Clear } from '@mui/icons-material'


interface State {
  id: string
  password: string
}

enum SubmitStatus {
  READY,
  SUBMITTING,
  DONE,
  FAILED,
}

const LoginPage: React.FC<{ fromUrl?: string }> = ({ fromUrl = '/mypage' }) => {
  const [{ id, password }, setValues] = React.useState({ id: '', password: '' })
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>(SubmitStatus.READY)
  const [inputSaved, setInputSaved] = React.useState(false)
  const { logIn } = React.useContext(UserContext)
  const { enqueueSnackbar, closeSnackbar } = NotiStack.useSnackbar()


  const handleChange = (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [prop]: evt.target.value }))
  }

  const submitData = async () => {
    setSubmitStatus(SubmitStatus.SUBMITTING)
    await fetch(`/api/account/find?userId=${id}`, { method: 'GET' })
      .then(res => always<Promise<IAccount>>(res.json(), console.log(res)))
      .then(({ userId, password: resPassword }) => {
        console.log(userId);
        if (resPassword === password) {
          setLoggedUser({ userId, password: resPassword });
          setSubmitStatus(SubmitStatus.DONE);
          Router.push(fromUrl);
        } else {
          setSubmitStatus(SubmitStatus.FAILED);
          throw new global.Error();
        }
      })
      .catch((e) => {
        console.error(e)
        setSubmitStatus(SubmitStatus.FAILED)
        enqueueSnackbar(
          <div>
            <Typography sx={{ fontWeight: 'bold', display: 'block' }}>Login Failed!</Typography>
            <Typography>check if id or password is correctly typed</Typography>
            <Typography>or you can
              <Link href='/register' sx={{
                textDecoration: 'none',
                display: 'inline',
                marginLeft: '0.25em',
                fontWeight: 'bold',
                transition: 'color 0.25s',
                color: 'white',
                '&:hover': {
                  color: '#FFBA46'
                },
              }}>
                create new account!
              </Link>
            </Typography>
          </div>,
          {
            variant: 'error',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            action: id => (
              <IconButton onClick={() => closeSnackbar(id)}>
                <Clear />
              </IconButton>
            ),
          })
      })
  }

  const isValid = id !== '' && password !== ''
  const isEnd = submitStatus === SubmitStatus.DONE || submitStatus === SubmitStatus.FAILED

  return (
    <Layout>
      <Box flexDirection='column' sx={{ display: 'flex', alignItems: 'center', pt: '100px', justifyContent: 'center', minWidth: '100%', minHeight: '100%' }}>
        <Typography id='title' variant='h2' noWrap fontSize='min(6vw, 70px)'>
          Login Account
        </Typography>

        <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)' }}>
          <CustomTextInput handleChange={handleChange('id')} value={id} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Id' />
          <CustomTextInput handleChange={handleChange('password')} value={password} enable={submitStatus !== SubmitStatus.SUBMITTING} name='Password' privated />
          <Button color='inherit' sx={{ justifyContent: 'flex-start', alignItems: 'center', m: 0, p: 0 }} onClick={() => setInputSaved(prev => !prev)}>
            <CheckBoxRoundedIcon color='primary' sx={{ opacity: inputSaved ? 0 : 1, transition: 'all 0.25s' }} />
            <CheckBoxOutlineBlankRoundedIcon sx={{ opacity: inputSaved ? 1 : 0, position: 'absolute', transition: 'all 0.25s' }} />
            Remember Account
          </Button>
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
                  initCasePartially<JSX.Element>()(SubmitStatus, {
                    [SubmitStatus.DONE]: () => <Check />,
                    [SubmitStatus.FAILED]: () => <Error />,
                  }, submitStatus) ?? <Add />
                }
                color={
                  initCasePartially<string>()(SubmitStatus, {
                    [SubmitStatus.DONE]: () => 'success',
                    [SubmitStatus.FAILED]: () => 'error',
                  }, submitStatus) ?? 'primary'
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
  )
}

export default LoginPage