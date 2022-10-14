import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Box from '@mui/system/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { useThemeController } from './MainThemeProvider'
import useTheme from '@mui/material/styles/useTheme'

import * as Colors from '@mui/material/colors';

const colors: Array<Exclude<keyof typeof Colors, 'common'>> = ["amber", "blue", "blueGrey", "brown", "cyan", "deepOrange", "deepPurple", "green", "grey", "indigo", "lightBlue", "lightGreen", "lime", "orange", "pink", "purple", "red", "teal", "yellow"];

const ThemeSelection: React.FC = () => {
  const { toggleColorMode, setColorPalette } = useThemeController();
  const theme = useTheme();
  const timeout = React.useRef<NodeJS.Timeout>();
  const [ anchorEl, setAnchorEL ] = React.useState<Element | null>(null);

  return (
    <div>
      <IconButton 
        onClick={toggleColorMode} 
        onMouseDown={({currentTarget})=>{
          timeout.current = setTimeout(() => {
            setAnchorEL(currentTarget);
          }, 1 * 1000);
        }}
        onMouseUp={()=>{
          if(timeout.current) clearTimeout(timeout.current);
        }}
      >
        {theme.palette.mode == 'light' ? <LightModeIcon /> : <DarkModeIcon /> }
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>setAnchorEL(null)}>
        <div style={{ margin: '8px' }}>
          <Typography fontSize={15} fontWeight={500}>Theme Selection</Typography>
          <Divider />
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            width: '300px',
            "& div": {
              width: '20px', 
              height: '20px', 
              borderRadius: '10px',
              margin: '5px'
            } 
          }}>
            {colors.map(color => <div style={{ backgroundColor: Colors[color][300] }} onClick={()=>setColorPalette(color)} />)}
          </Box>
        </div>
      </Menu>
    </div>
  )
}

export default ThemeSelection;