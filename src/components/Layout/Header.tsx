import React from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout';

import type { StandardLonghandProperties } from 'csstype'

import SideMenu from '../SideMenu'
import ThemeSelection from './ThemeSelection'
import Divider from '@mui/material/Divider';

interface HeaderProps {
  additional?: React.ReactNode | undefined
  height?: StandardLonghandProperties['height']
}

const Header: React.FC<HeaderProps> = ({
  additional,
  height = '60px'
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header>
        <AppBar sx={{ height }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <IconButton sx={{ color: 'white' }} onClick={() => setOpen(prev => !prev)}>
                <MenuIcon />
              </IconButton>
              <Tooltip title='back to main'>
                <Link href='/'>
                  <Button sx={{ marginLeft: '10px', display: 'inline' }}>
                    <Typography align='center' style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                      Sharlotte
                    </Typography>
                  </Button>
                </Link>
              </Tooltip>
            </div>
            <HeaderMenu />
          </Toolbar>
          {additional}
        </AppBar>
      </header>
      <SideMenu
        anchor='left'
        variant="temporary"
        open={open}
        onClose={() => setOpen(prev => !prev)}
      />
    </>
  )
}

const HeaderMenu: React.FC = () => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton sx={{ color: 'white' }} onClick={e => e.currentTarget && setAnchor(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            minWidth: '180px',
            padding: '0 10px',
            borderRadius: '10px'
          }
        }}
      >
        <Profile />
        <Divider />
        <ThemeSelection />
      </Menu>
    </div>
  )
}

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 10px', width: '100%' }}>
      <a href='/mypage' style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={session?.user?.image ?? ''} sx={{ padding: '4px', margin: '4px', width: '35px', height: '35px', backgroundColor: 'rgba(0,0,0,0)' }} ><></></Avatar>
        <span>{session?.user?.name ?? 'not logged in!'}</span>
      </a>
      {
        status === 'authenticated'
          ? <IconButton disableRipple onClick={() => signOut()}><LogoutIcon /></IconButton>
          : <IconButton disableRipple onClick={() => signIn()}><LoginIcon /></IconButton>
      }
    </div>
  )
}

export default Header