import React from 'react';
import { ScriptProps } from 'next/script';
import { AppBar, Fab, Toolbar, Button, SlideProps } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from './Header';
import ScrollTop from './ScrollTop';
import * as NotiStack from 'notistack'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';

interface LayoutProps extends ScriptProps {
  header?: JSX.Element
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { data: session } = useSession();
  const { enqueueSnackbar, closeSnackbar } = NotiStack.useSnackbar()

  React.useEffect(() => {
    setTimeout(() => {
      enqueueSnackbar('you are not logged in', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        action: () => <Link href='/login'><Button>Log In</Button></Link>,
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

      <ScrollTop {...props}>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
export default Layout;