import React from 'react'
import Link from 'next/link'

import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Container from '@mui/system/Container'
import Stack from '@mui/system/Stack'

import MenuIcon from '@mui/icons-material/Menu'
import EmailIcon from '@mui/icons-material/Email';

import { DiscordIcon, GithubIcon } from 'src/assets/icons'

const SideMenuDrawer: React.FC = () => {
    //fs는 웹브라우저가 아닌 Node.js용으로 설계되었고 다른 모듈 깔기 귀찮기도 하고 정적 리스트니 수동 기입
    const files = ['cardDefense', 'Informatis', 'kakaoBridge'];

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
                    <Typography sx={{ fontWeight: 500, fontsize: 16, textAlign: 'left' }}>Projects</Typography>
                    <Stack direction='column' spacing={2} style={{ marginLeft: '10px', marginTop: '10px' }}>
                        {files.map<JSX.Element>(project => {
                            return (
                                <Link href={`/projects/${project}`} key={project}>
                                    <Typography sx={{ fontWeight: 600, transition: 'color,marginLeft 150ms,50ms ease-in,ease-put', "&:hover": { color: '#91bdff', marginLeft: '10px' } }}>{project}</Typography>
                                </Link>
                            )
                        })}
                    </Stack>
                </div>
            </Container>
            <div style={{ width: '100%' }}>
                <Divider textAlign='left' sx={{ color: 'black' }}><Typography sx={{ fontWeight: 500, fontSize: 12 }}>About</Typography></Divider>
                <div style={{ marginTop: '10px', display: 'flex' }}>
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
                </div>
            </div>
        </Stack>
    )
}
const SideMenu: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    return (<>
        <IconButton sx={{ color: 'white' }} onClick={() => setOpen(prev => !prev)}><MenuIcon /></IconButton>
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