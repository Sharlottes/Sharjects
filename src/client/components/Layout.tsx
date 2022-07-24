import React from 'react';
import type { ScriptProps } from 'next/script';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import Header from './Header';
import { useSnackbar } from 'notistack'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

interface LayoutProps extends ScriptProps {
  header?: JSX.Element
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { data: session } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
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
  }, [])

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