import Link from 'next/link'
import React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import styled from '@mui/system/styled'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'

import MenuIcon from '@mui/icons-material/Menu'
import DiscordIcon from 'src/client/assets/icons/DiscordIcon'

import { typeAsserted } from 'src/utils/typeAsserted'
import ProfileAvatar from 'components/ProfileAvatar'

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
            <ProfileAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header