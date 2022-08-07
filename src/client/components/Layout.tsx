import React from 'react';

import type { ScriptProps } from 'next/script';

import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'

import CloseIcon from '@mui/icons-material/Close';

import Header from './Header';
import { useSnackbar } from 'notistack'
import { signIn, useSession } from 'next-auth/react'

interface LayoutProps extends ScriptProps {
  header?: JSX.Element,
  muteAlart?: boolean
}

const Layout: React.FC<LayoutProps> = ({ header, children, muteAlart = false }) => {
  const { status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (muteAlart || status !== "unauthenticated") return;

    setTimeout(() => {
      enqueueSnackbar('you are not logged in', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        action: (id) =>
          <>
            <Button onClick={() => signIn()}>Log In</Button>
            <IconButton onClick={() => closeSnackbar(id)}><CloseIcon /></IconButton>
          </>,
        autoHideDuration: 5000
      })
    }, 3000);
  }, [closeSnackbar, enqueueSnackbar, muteAlart, status])

  return (
    <>
      <AppBar sx={{ 'backgroundColor': 'white' }}>
        <Header />
        {header}
      </AppBar>

      <Toolbar id='back-to-top-anchor' />

      {children}
    </>
  )
}
export default Layout;