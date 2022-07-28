import React from 'react'
import Router from 'next/router'

import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Menu from '@mui/material/Menu'
import Link from '@mui/material/Link'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'


import UserContext from '../contexts/UserContext'

const IconTabs: React.FC<{ onClick: (evt: React.MouseEvent<HTMLElement>) => void }> = ({ onClick }) =>
  <Stack
    direction='row'
    sx={{
      '& .MuiSvgIcon-root': { mr: '4px', ml: '4px' },
      '& :hover': { color: 'black' },
      '& *': { transition: 'color 0.25s ease-in' },
      color: 'gray',
    }}
  >
    <IconButton onClick={onClick}>
      <AccountCircleIcon />
    </IconButton>

    {/*TODO: make setting page 
      <SettingIcon />
    */}

  </Stack>


const ProfileAvatar: React.FC = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<HTMLElement | null>(null)
  const handleProfileOpen = (evt: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(evt.currentTarget)
  const handleProfileClose = () => setProfileAnchorEl(null)

  const { logOut, loggedIn } = React.useContext(UserContext)
  const handleLog = () => {
    if (loggedIn) logOut()
    else Router.push('/login')
  }

  return (
    <>
      <IconTabs onClick={handleProfileOpen} />

      <Menu
        anchorEl={profileAnchorEl}
        id='profile-menu'
        open={Boolean(profileAnchorEl)}
        onClick={handleProfileClose}
        onClose={handleProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href='/mypage'>
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLog}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {loggedIn ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProfileAvatar