import Link from 'next/link'
import React, { type PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

import Profile from './Profile'
import SideMenu from './SideMenu'
import ThemeSelection from './ThemeSelection'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header>
      <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <SideMenu />
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeSelection />
            <Profile />
        </div>
        </Toolbar>
        {children}
      </AppBar>
    </header>
  )
}

export default Header