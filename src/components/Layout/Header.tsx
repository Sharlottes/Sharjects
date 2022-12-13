import React from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

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
import LogoutIcon from '@mui/icons-material/Logout';

import type { StandardLonghandProperties } from 'csstype'

import SideMenu from '../SideMenu'
import ThemeSelection from './ThemeSelection'
import { motion, useScroll, useAnimationControls, Variants } from 'framer-motion'

interface HeaderProps {
  additional?: React.ReactNode | undefined
  height?: StandardLonghandProperties['height']
}

const headerAnimateVaraints: Variants = {
  blur: prog => ({
    margin: '10px min(calc(100% - 400px), 15%)',
    width: 'calc(100% - min(calc(100% - 400px), 15%))',
    left: 'calc(-1 * min(calc((100% - 400px) / 2), 7.5%))',
    borderRadius: '20px',
    opacity: 0.5,
    transition: {
      duration: 1
    },
  }),
  init: {
    margin: '0px',
    width: '100%',
    left: 0,
    opacity: 1,
    borderRadius: '0px',
    transition: {
      duration: 1
    },
  }
}

const Header: React.FC<HeaderProps> = ({
  additional,
  height = '60px'
}) => {
  const [open, setOpen] = React.useState(false);
  const controller = useAnimationControls();
  const { scrollY, scrollYProgress } = useScroll();

  React.useEffect(() => {
    controller.set('init')
    return scrollY.onChange((latest) => {
      controller.start(latest === 0 ? 'init' : 'blur'); 
    })
  }, [])

  return (
    <>
      <AppBar 
        custom={scrollYProgress.get()}
        component={motion.div} 
        animate={controller} 
        variants={headerAnimateVaraints} 
        initial={scrollYProgress.get() !== 0 ? 'blur' : 'init'} 
        whileHover={{ opacity: 1 }}
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