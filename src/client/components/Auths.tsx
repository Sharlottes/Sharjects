import React from 'react';
import { Stack, Button, Divider, styled } from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import CustomTextInput from './CustomTextInput';
import { DiscordIcon } from '../assets/icons';
import GithubIcon from '../assets/icons/GithubIcon';
import GoogleIcon from '../assets/icons/GoogleIcon';


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

  const StyledCustomTextInput = styled(CustomTextInput)(() => ({
    width: 'min(70vw, 300px)',
  }));
  const [email, setEmail] = React.useState('');

  return (
    <Stack direction='column' spacing={1.5}>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <StyledCustomTextInput
          handleChange={e => setEmail(e.target.value)}
          value={email ?? ''}
          name='Email'
          required={false}
          cons={[[(value: string) => !value || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), 'Invalid Format']]}
        />
      </div>
      {Object.values(providers ?? {}).map((provider) => {
        if (provider.name === 'Email') return;
        const { icon, colors: [base, bg, accent] } = icons[provider.name.toLowerCase()];

        return (
          <div key={provider.name} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                width: 'min(70vw, 300px)',
                transitionProperty: "width, background-color, color",
                transitionDuration: "0.5s, 0.5s, 0.5s",
                transitionDelay: "0s, 0.4s, 0.25s",
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