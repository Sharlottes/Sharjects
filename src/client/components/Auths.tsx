import React from 'react'
import { Stack, Button, Divider, Box, Zoom, InputLabel, FormControl, InputAdornment, FormHelperText, OutlinedInput } from '@mui/material'
import { signIn } from 'next-auth/react'
import DiscordIcon from '../assets/icons/DiscordIcon'
import GithubIcon from '../assets/icons/GithubIcon'
import GoogleIcon from '../assets/icons/GoogleIcon'

import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'

const EmailField: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const isValid = !email || /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email);

  return <Box
    sx={{ display: 'flex', justifyContent: 'flex-start', width: 'min(70vw, 300px)' }}
  >
    <FormControl>
      <InputLabel htmlFor='email' variant='outlined'>Email</InputLabel>
      <OutlinedInput
        id='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!isValid}
        endAdornment={
          <InputAdornment position="end">
            <Zoom in={email !== '' && isValid}>
              <Button sx={{
                color: 'white',
                backgroundColor: '#468440',
                width: '88px', height: '55px',
                mr: '-14px',
                opacity: 1,
                "&:hover": {
                  backgroundColor: '#468440',
                }
              }}>SIGN IN</Button>
            </Zoom>
          </InputAdornment>
        }
        label="Email"
        aria-describedby="filled-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
      />
      {!isValid && (
        <FormHelperText id="filled-weight-helper-text" sx={{ color: 'red' }}>Invalid Format</FormHelperText>
      )}
    </FormControl>
  </Box>;
}

const Auths: React.FC<{
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | undefined
}> = ({ providers }) => {
  const icons: Record<string, { icon: JSX.Element, colors: string[] }> = {
    google: {
      icon: <GoogleIcon sx={{ color: 'white' }} />,
      colors: ['#679df6', '#5491f5', 'white']
    },
    github: {
      icon: <GithubIcon sx={{ color: 'black' }} className='githubIcon' />,
      colors: ['#8b76a9', 'black', 'white']
    },
    discord: {
      icon: <DiscordIcon sx={{ color: 'white' }} />,
      colors: ['#8ea0e1', '#8094dd', 'white']
    }
  }

  return (
    <Stack direction='column' spacing={1.5}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <EmailField />
      </div>
      {Object.values(providers ?? {}).map((provider) => {
        if (provider.name === 'Email') return <></>;
        const { icon, colors: [base, bg, accent] } = icons[provider.name.toLowerCase()];

        return (
          <div key={provider.name} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                width: 'min(70vw, 300px)',
                transitionProperty: "width, background-color, color",
                transitionDuration: "0.3s, 0.3s, 0.3s",
                transitionDelay: "0s, 0.2s, 0.1s",
                borderColor: base,
                color: base,
                "&:hover": {
                  width: 'calc(min(70vw, 300px) * 1.2)',
                  'background-color': bg,
                  color: accent,
                  "& .githubIcon": {
                    color: 'white'
                  }
                },
                "& .githubIcon": {
                  transitionProperty: "color",
                  transitionDuration: "0.5s",
                  transitionDelay: "0.25s",
                  color: 'black'
                }
              }}
              variant='outlined'
              onClick={() => signIn(provider.id)}
            >
              {icon} <Divider orientation='vertical' sx={{ ml: 1, mr: 1 }} /> Sign in with {provider.name}
            </Button>
          </div>
        )
      })}
    </Stack>
  );
}

export default Auths;