import React from 'react'
import Link from 'next/link'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'

import SideMenu from '../SideMenu'
import ThemeSelection from './ThemeSelection'
import { dispatch } from 'src/utils/dispatch'

import { signIn, signOut, useSession } from 'next-auth/react'
import { motion, useScroll, useAnimationControls, Variants } from 'framer-motion'

interface HeaderProps {
  additional?: React.ReactNode | undefined
}

const headerAnimateVaraints: Variants = {
  blur: {
    margin: '10px min(calc(100% - min(70%, 400px)), 15%)',
    width: 'calc(100% - min(calc(100% - min(70%, 400px)), 15%))',
    left: 'calc(-1 * min(calc((100% - min(70%, 400px)) / 2), 7.5%))',
    opacity: 0.5,
    borderRadius: '20px',
  },
  init: {
    margin: '0px',
    width: '100%',
    left: 0,
    opacity: 1,
    borderRadius: '0px',
  }
}

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const [open, setOpen] = React.useState(false);
  const controller = useAnimationControls();
  const { scrollY } = useScroll();

  React.useEffect(() => {
    controller.set('init')
    const animate = dispatch((latest: number) => controller.start(latest === 0 ? 'init' : 'blur'), 0.3 * 1000);
    animate('init', 0);
    return scrollY.onChange((latest) => {
      animate(latest === 0 ? 'init' : 'blur', latest);
    })
  }, [])

  return (
    <>
      <motion.div
        onHoverStart={() => controller.start({ opacity: 1 })}
        onHoverEnd={() => controller.start({ opacity: scrollY.get() < 1 ? 1 : 0.5 })}>
        <AppBar
          component={motion.div}
          animate={controller}
          transition={{ duration: 0.3 }}
          variants={headerAnimateVaraints}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <IconButton sx={{ color: 'white' }} onClick={() => setOpen(prev => !prev)}>
                <MenuIcon />
              </IconButton>
              <Tooltip title='back to main'>
                <Link href='/'>
                  <Button sx={{ marginLeft: '10px', color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                    Sharlotte
                  </Button>
                </Link>
              </Tooltip>
            </div>
            <HeaderMenu />
          </Toolbar>
          {additional}
        </AppBar>
      </motion.div>

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
        <SettingsIcon />
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
      <a href='/mypage' style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Avatar 
          src={session?.user?.image ?? ''} 
          sx={{ 
            padding: '4px', margin: '4px', 
            width: '35px', height: '35px', 
            backgroundColor: 'rgba(0,0,0,0)' 
          }}
        />
        {session?.user?.name ?? 'not logged in!'}
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