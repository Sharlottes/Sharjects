import { Box, Button, Divider } from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleIcon from '../assets/icons/GoogleIcon';

const Auths: React.FC = () =>
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Button
      sx={{
        width: 'min(70vw, 300px)',
        transitionProperty: "width, background-color, color",
        transitionDuration: "0.5s, 0.5s, 0.3s",
        transitionDelay: "0s, 0.25s, 0.75s",
        "&:hover": {
          width: '100vw',
          'background-color': '#aebcfc',
          color: '#4242f5'
        }
      }}
      variant='outlined'
      onClick={() => signIn('google')}
    >
      <GoogleIcon /> <Divider orientation='vertical' sx={{ ml: 1, mr: 1 }} /> with Google
    </Button>
  </Box>

export default Auths;