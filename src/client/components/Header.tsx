import Link from 'next/link'
import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'

import CommunicationIcon from '../assets/icons/CommunicationIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'

import { typeAsserted } from 'src/utils/typeAsserted'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Drawer } from '@mui/material'

const links = typeAsserted<Array<[string, string]>>()([
  ['/', 'Home'],
  ['/about', 'About'],
])
  .map(([url, name]) =>
    ({ url, name })
  )

const Profile: React.FC = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<HTMLElement | null>(null)
  const handleProfileOpen = (evt: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(evt.currentTarget)
  const handleProfileClose = () => setProfileAnchorEl(null)

  const { data: session, status } = useSession();

  return (
    <>
      <Stack direction='row'>
        <IconButton onClick={handleProfileOpen}>
          {session?.user?.image
            ? <Avatar src={session.user.image} />
            : <AccountCircleIcon />
          }
        </IconButton>
      </Stack>

      <Menu
        id='profile-menu'
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClick={handleProfileClose}
        onClose={handleProfileClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link href='/mypage'>
            <Typography sx={{ textDecoration: 'none' }}>
              Your Profile
            </Typography>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => status === 'unauthenticated' ? signIn() : signOut()}>
          {status === 'unauthenticated' ? "Sign In" : "Sign Out"}
        </MenuItem>
      </Menu>
    </>
  )
}

const NavMenu: React.FC = () => {
  return (
    <Box>
      {links.map((link, i) =>
        <Button key={i} sx={{ my: 2, color: 'white' }}>
          <Link href={link.url}>
            <Typography className='.noselect'>{link.name}</Typography>
          </Link>
        </Button>
      )}
    </Box>
  )
}

const SideMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={() => setOpen(prev => !prev)}><MenuIcon /></IconButton>
      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(prev => !prev)}
      >
        asdfadf
      </Drawer>
    </>
  )
}

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack
          direction='row'
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <SideMenu />
          <Link href='/'>
            <Tooltip title='back to main'>
              <IconButton sx={{ color: 'white' }}><CommunicationIcon /></IconButton>
            </Tooltip>
          </Link>
          <NavMenu />
        </Stack>
        <Profile />
      </Toolbar>
    </AppBar >
  )
}

export default Header