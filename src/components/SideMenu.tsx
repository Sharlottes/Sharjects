import React from 'react'
import Link from 'next/link'

import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/system/Container'
import Stack from '@mui/system/Stack'

import MenuIcon from '@mui/icons-material/Menu'
import EmailIcon from '@mui/icons-material/Email';

import { DiscordIcon, GithubIcon } from 'src/assets/icons'

const files: Record<string, string[]> = {
    'Sharlottes': ['Informatis', 'Sharustry', 'KakaoBot', 'kakaoBridge', 'SharBot', 'RealTimeRPG', 'KakaoNacksee', 'Timer'],
    'Gamer-Studio': ['CardDefense'], 
    'AvantTeam': ['ProjectUnity']
};

const SideMenuDrawer: React.FC = () => {
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100%', width: '100%' }}>
            <Container sx={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '10px', width: '100' }}>
                    <Link href='/'>
                        <Typography sx={{ fontWeight: 800, fontSize: 20, textAlign: 'left', transition: 'color 150ms ease-in', "&:hover": { color: '#91bdff' } }}>
                            Sharlotte's Portfolio
                        </Typography>
                    </Link>
                    <Typography variant='body2' textAlign='right' sx={{ marginLeft: '5px' }}>the first portfolio</Typography>
                </div>
                
                <Divider />
                
                <div style={{ marginLeft: '10px', marginTop: '15px', width: '100%' }}>
                    {Object.keys(files).map(owner => (
                        <div key={owner} style={{ marginTop: '10px' }}>
                            <Box className='highlight' sx={{ 
                                display: 'flex', justifyItems: 'start', 
                                "&:hover": { "& p": {
                                    color: '#4056f7'
                                } } 
                            }}>
                                <img src={`images/profile/${owner}.png`} width='20px' height='20px' alt='' style={{ borderRadius: '20px', marginRight: '5px' }} />
                                <Link href={`https://github.com/${owner}`}>
                                    <Typography sx={{ 
                                        fontWeight: 500, fontsize: 16, textAlign: 'left',
                                        transition: 'color 150ms ease-in'
                                    }}>{owner}</Typography>
                                </Link>
                            </Box>
                            {files[owner].map(project => (
                                <Box className='highlight' key={project} sx={{ 
                                    "&:hover": { "& p": {
                                        color: '#91bdff', 
                                        marginLeft: '50px'
                                    } } 
                                }}>
                                    <Link href={`/projects/${project}`}>
                                        <Typography sx={{ 
                                            fontWeight: 600, 
                                            marginLeft: '35px',
                                            marginTop: '3px', marginBottom: '3px',
                                            transition: 'color,marginLeft 150ms,50ms ease-in,ease-put'
                                        }}>
                                            {project}
                                        </Typography>
                                    </Link>
                                </Box>
                            ))}
                        </div>
                    ))}
                </div>
            </Container>
            <div style={{ width: '100%', marginBottom: '10px' }}>
                <Divider textAlign='left' sx={{ color: 'black' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 12 }}>About</Typography>
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'end', "& a": { transition: 'margin-bottom 200ms', marginBottom: '0px', "&:hover": { marginBottom: '5px' } } }}>
                    <a href='https://github.com/sharlottes'>
                        <IconButton sx={{ color: 'black' }}>
                            <GithubIcon />
                        </IconButton>
                    </a>
                    <a href='https://discordapp.com/users/473072758629203980'>
                        <IconButton>
                            <DiscordIcon />
                        </IconButton>
                    </a>
                    <a href='mailto:aaa9810321@gmail.com'>
                        <IconButton sx={{ color: '#c5221f' }}>
                            <EmailIcon />
                        </IconButton>
                    </a>
                </Box>
            </div>
        </Stack>
    )
}
const SideMenu: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    return (<>
        <IconButton sx={{ color: 'white' }} onClick={() => setOpen(prev => !prev)}>
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor='left'
            open={open}
            onClose={() => setOpen(prev => !prev)}
        >
            <SideMenuDrawer />
        </Drawer>
    </>)
}

export default SideMenu;