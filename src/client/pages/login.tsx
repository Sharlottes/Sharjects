import React from 'react'
import Router from 'next/router'
import { useSnackbar } from 'notistack'
import type { IAccountDocument } from 'models/Account'

import { initCasePartially } from 'src/utils/initCasePartially'
import { always } from 'src/utils/always'
import UserContext from 'src/client/contexts/UserContext'
import CustomTextInput from 'components/CustomTextInput'
import Layout from 'components/Layout'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'

import Auths from 'components/Auths'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import ClearIcon from '@mui/icons-material/Clear'
import { BaseComponentType } from './_app'

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

const WarnAlert = (
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
  </div>
)

const LoginPage: BaseComponentType<{ fromUrl?: string }> = ({ fromUrl = '/mypage' }) => {
  const [{ id, password }, setValues] = React.useState({ id: '', password: '' })
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>(SubmitStatus.READY)
  const [inputSaved, setInputSaved] = React.useState(false)
  const { logIn } = React.useContext(UserContext)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()


  const handleChange = (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [prop]: evt.target.value }))
  }

  const submitData = async () => {
    setSubmitStatus(SubmitStatus.SUBMITTING)
    await fetch(`/api/account?userId=${id}`, { method: 'GET' })
      .then(res => always<Promise<IAccountDocument>>(res.json(), console.log(res)))
      .then((account) => {
        if (account.password === password) {
          logIn(account)
          setSubmitStatus(SubmitStatus.DONE)
          Router.push(fromUrl)
        } else {
          setSubmitStatus(SubmitStatus.FAILED)
          throw new global.Error()
        }
      })
      .catch((e) => {
        console.error(e)
        setSubmitStatus(SubmitStatus.FAILED)
        enqueueSnackbar(WarnAlert,
          {
            variant: 'error',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            action: id => (
              <IconButton onClick={() => closeSnackbar(id)}>
                <ClearIcon />
              </IconButton>
            ),
          })
      })
  }

  const isValid = id !== '' && password !== ''
  const isEnd = submitStatus === SubmitStatus.DONE || submitStatus === SubmitStatus.FAILED

  return (
    <Layout muteAlart>
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
                    [SubmitStatus.DONE]: () => <CheckIcon />,
                    [SubmitStatus.FAILED]: () => <ErrorIcon />,
                  }, submitStatus) ?? <AddIcon />
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
      <Divider sx={{ color: "gray", ml: "15vw", mr: "15vw", mb: "20px", "&::before": { top: 0 }, "&::after": { top: 0 } }}>
        OR
      </Divider>
      <Auths />
    </Layout>
  )
}
LoginPage.auth = true

export default LoginPage