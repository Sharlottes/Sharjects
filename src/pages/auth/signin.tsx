import React from 'react'
import Router from 'next/router'

import CustomTextInput from 'components/CustomTextInput'
import Layout from 'components/Layout'
import Auths from 'components/Auths'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import AddIcon from '@mui/icons-material/Add'

import { getProviders, signIn } from 'next-auth/react'

import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { BaseComponentType } from '../_app'

interface State {
  username: string
  password: string
}

const SignIn: BaseComponentType<{
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}> = ({ providers }) => {
  const [{ username, password }, setValues] = React.useState<State>({ username: '', password: '' })
  const [asEmail, setAsEmail] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const handleChange = (prop: keyof State) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [prop]: evt.target.value }))
  }

  const registerUser = async (username: string, password: string, e: React.MouseEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    let data = await res.json()
    if (data.message === "success") {
      await signIn("credentials", { redirect: false, username, password })
      return Router.push("/")
    }
  }

  const isValid = username !== '' && password !== ''

  return (
    <Layout muteAlart>
      <Box flexDirection='column' sx={{ display: 'flex', alignItems: 'center', pt: '100px', justifyContent: 'center', minWidth: '100%', minHeight: '100%' }}>
        <Typography id='title' variant='h2' noWrap fontSize='min(6vw, 70px)'>
          Login User
        </Typography>

        <Stack direction='column' spacing={1} sx={{ mt: '20px', mb: '20px', width: 'min(70vw, 300px)' }}>
          <CustomTextInput
            handleChange={(evt) => {
              setAsEmail(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(evt.target.value));
              handleChange('username')(evt);
            }}
            value={username}
            label={value =>
              !value
                ? "Username or Email"
                : asEmail
                  ? <>Username or <span style={{ fontWeight: 'bold' }}>Email</span></>
                  : <><span style={{ fontWeight: 'bold' }}>Username</span> or Email</>
            } />
          <CustomTextInput handleChange={handleChange('password')} value={password} label='Password' privated />
          <Button
            sx={{ justifyContent: 'flex-start', alignItems: 'center', m: 0, p: 0 }}
            onClick={() => setRemember(prev => !prev)}
            color='inherit'
          >
            <CheckBoxRoundedIcon color='primary' sx={{ opacity: remember ? 0 : 1, transition: 'all 0.25s' }} />
            <CheckBoxOutlineBlankRoundedIcon sx={{ opacity: remember ? 1 : 0, position: 'absolute', transition: 'all 0.25s' }} />
            Remember User
          </Button>
          <Button
            onClick={() => signIn('credentials', { username, password, remember })}
            startIcon={<AddIcon />}
            disabled={!isValid}
            variant='outlined'
            color='primary'
            fullWidth
          >
            Sign In
          </Button>
          <Button
            onClick={(e) => registerUser(username, password, e)}
            startIcon={<AddIcon />}
            disabled={!isValid}
            variant='outlined'
            color='primary'
            fullWidth
          >
            Register
          </Button>
        </Stack>
      </Box>
      <Divider sx={{ color: "gray", ml: "15vw", mr: "15vw", mb: "20px", "&::before": { top: 0 }, "&::after": { top: 0 } }}>
        OR
      </Divider>
      <Auths providers={providers} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default SignIn