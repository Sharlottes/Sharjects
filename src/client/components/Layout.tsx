import React from 'react';
import Link from 'next/link';

import type { ScriptProps } from 'next/script';

import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'

import CloseIcon from '@mui/icons-material/Close';

import Header from './Header';
import { useSnackbar } from 'notistack'
import { useSession } from 'next-auth/react'

interface LayoutProps extends ScriptProps {
  header?: JSX.Element
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { data: session } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    console.log("called");
    setTimeout(() => {
      enqueueSnackbar('you are not logged in', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        action: (id) =>
          <>
            <Link href='/login'><Button>Log In</Button></Link>
            <IconButton onClick={() => closeSnackbar(id)}><CloseIcon /></IconButton>
          </>,
        autoHideDuration: 5000
      })
    }, 3000);
  }, [closeSnackbar, enqueueSnackbar])

  return (
    <>
      <AppBar sx={{ 'backgroundColor': 'white' }}>
        <Header />
        {props.header}
      </AppBar>

      <Toolbar id='back-to-top-anchor' />

      {props.children}
    </>
  )
}
export default Layout;