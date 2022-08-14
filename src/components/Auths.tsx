import React from 'react'

import { Stack, Divider, Button } from '@mui/material'
import { signIn } from 'next-auth/react'

import DiscordIcon from '../assets/icons/DiscordIcon'
import GithubIcon from '../assets/icons/GithubIcon'
import GoogleIcon from '../assets/icons/GoogleIcon'

import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'

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
      {Object.values(providers ?? {}).map((provider) => {
        if (provider.name === 'Credentials') return <div style={{ display: 'none' }} key={provider.name} />;
        const { icon, colors: [base, bg, accent] } = icons[provider.name.toLowerCase()];

        return (
          <div key={provider.name} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                width: 'min(70vw, 300px)',
                transitionProperty: "background-color, color",
                transitionDuration: "0.3s",
                borderColor: base,
                color: base,
                "&:hover": {
                  backgroundColor: bg,
                  color: accent,
                  "& .githubIcon": {
                    color: 'white'
                  }
                },
                "& .githubIcon": {
                  transitionProperty: "color",
                  transitionDuration: "0.3s",
                  color: 'black'
                }
              }}
              variant='outlined'
              onClick={() => signIn(provider.id).then(data => console.log('after oauth: ', data))}
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