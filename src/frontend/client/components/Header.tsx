import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

import { Stack, Typography, IconButton, Avatar, Menu, MenuItem, ListItemIcon, AppBar, Toolbar, Container, Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'

import { DiscordIcon } from 'src/frontend/assets/icons'
import { typeAsserted } from 'src/utils/typeAsserted'
import UserContext from 'src/frontend/client/contexts/UserContext'

const links = typeAsserted<Array<[string, string]>>()([
  ['/', 'Home'],
  ['/about', 'About'],
  ['/botList', 'Bots'],
])
  .map(([url, name]) =>
    ({ url, name })
  )

const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'uni-sans-heavy',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'black',
  transition: 'all 0.5s',
  margin: '5px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#a7abd7',
  },
}))

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

const Profile: React.FC = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<HTMLElement | null>(null)
  const handleProfileOpen = (evt: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(evt.currentTarget)
  const handleProfileClose = () => setProfileAnchorEl(null)

  const { logOut, loggedIn } = React.useContext(UserContext)
  const handleLog = () => {
    console.log(loggedIn)
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
            <Logout fontSize="small" />
          </ListItemIcon>
          {loggedIn ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </>
  )
}

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static' color='transparent'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <DiscordIcon sx={{ transform: 'scale(2)', mr: 1 }} />


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {links.map((link, i) =>
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link href={link.url}>
                    <StyledTypography className='.noselect'>{link.name}</StyledTypography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((link, i) =>
              <Button key={i} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link href={link.url}>
                  <StyledTypography className='.noselect'>{link.name}</StyledTypography>
                </Link>
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Profile />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header