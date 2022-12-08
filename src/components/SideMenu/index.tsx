import React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Drawer, { type DrawerProps } from '@mui/material/Drawer'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import HistoryIcon from '@mui/icons-material/History'
import SourceIcon from '@mui/icons-material/Source'
import EmailIcon from '@mui/icons-material/Email'

import KakaoTalkIcon from 'src/assets/icons/KakaoTalkIcon'
import DiscordIcon from 'src/assets/icons/DiscordIcon'
import GithubIcon from 'src/assets/icons/GithubIcon'
import VelogIcon from 'src/assets/icons/VelogIcon'
import type { projectDataType } from 'src/@type'
import { useThemeController } from '../MainThemeProvider'

import VisitorGraphDialog from './VisitorGraphDialog'

const date = new Date();
const dateCode = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

const projectData: Array<projectDataType> = require('components/pages/projectData.json');

const Status: React.FC = () => {
    const [visitors, setVisitors] = React.useState<Record<string, number>>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/visit')
            .then(res => res.json())
            .then(data => setVisitors(data));
    }, []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <Divider textAlign='left'><Typography fontWeight={500} fontSize={12}>Visitors</Typography></Divider>
            <div style={{ marginLeft: '10px', fontSize: 12, fontWeight: 500 }}>
                {visitors
                    ? <>
                        이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고,<br />
                        총 {Object.values(visitors).reduce((a, e) => a + e, 0)}번 조회되었어요.
                    </>
                    : <>방문자 불러오는 중...</>
                }
                <span style={{ display: 'inline', color: 'blue', cursor: 'pointer' }} onClick={() => setDialogOpen(true)}>
                    그래프 보기
                </span>
            </div>
            {visitors
                ?
                <VisitorGraphDialog
                    data={visitors}
                    maxWidth='xs' fullWidth
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                />
                :
                <Dialog
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                >
                    <Box sx={{ padding: '15px' }}>
                        <Typography variant='h1' noWrap fontWeight='bold' fontSize={25} textAlign='center' sx={{ margin: '5px' }}>알림!</Typography>
                        <Divider />
                        <Box sx={{ margin: '10px' }}>
                            <Typography variant='h3' noWrap fontWeight={700} fontSize={15} textAlign='center'>방문자 데이터를 불러오는 중이에요!</Typography>
                            <Typography variant='body1' noWrap fontWeight={400} textAlign='center' sx={{ marginTop: '5px' }}>잠시만 기다려주세요...</Typography>
                        </Box>
                    </Box>
                </Dialog>
            }
        </div>
    )
}

const SideMenuDrawer: React.FC<DrawerProps> = (props) => {
    let { currentColors } = useThemeController();

    return (
        <Drawer {...props} PaperProps={{
            sx: {
                display: 'flex', flexDirection: 'column', justifyContent: "space-between", overflowX: 'hidden'
            }
        }}>
            <div style={{ padding: '0 24px', marginTop: '20px' }}>
                <div style={{ marginBottom: '10px', width: '100' }}>
                    <a href='/'>
                        <Typography sx={{ fontWeight: 800, fontSize: 20, textAlign: 'left', transition: 'color 150ms ease-in', "&:hover": { color: currentColors[600] } }}>
                            Sharlotte's Portfolio
                        </Typography>
                    </a>
                    <Typography variant='body2' sx={{ marginLeft: '5px', position: 'relative', left: '100px' }}>the first portfolio</Typography>
                </div>

                <Divider />

                <div>
                    <a href='/timeline'>
                        <Button startIcon={<HistoryIcon />} variant='contained' size='small' sx={{ borderRadius: '20px', margin: '10px' }}>
                            Timeline
                        </Button>
                    </a>
                    <a href='/projects'>
                        <Button startIcon={<SourceIcon />} variant='contained' size='small' sx={{ borderRadius: '20px', margin: '10px' }}>
                            Projects
                        </Button>
                    </a>
                </div>
                
                <Divider textAlign='left'><Typography fontWeight={500} fontSize={12}>Projects</Typography></Divider>

                <div style={{ marginLeft: '10px', marginTop: '15px', width: '100%' }}>
                    {projectData.map(({ owner, projects }) =>
                        <div key={owner} style={{ marginTop: '10px' }}>
                            <Box className='highlight' sx={{
                                display: 'flex', justifyItems: 'start',
                                "&:hover": {
                                    "& p": {
                                        color: currentColors[600]
                                    }
                                }
                            }}>
                                <img src={`/images/profile/${owner}.png`} width='20px' height='20px' alt='' style={{ borderRadius: '20px', marginRight: '5px' }} />
                                <a href={`https://github.com/${owner}`}>
                                    <Typography sx={{
                                        fontWeight: 500, fontsize: 16, textAlign: 'left',
                                        transition: 'color 150ms ease-in'
                                    }}>{owner}</Typography>
                                </a>
                            </Box>
                            {projects.map((project, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box className='highlight' sx={{
                                        "&:hover": {
                                            "& p": {
                                                color: currentColors[300],
                                                marginLeft: '50px'
                                            }
                                        }
                                    }}>
                                        <a href={`/projects/${project.name}`}>
                                            <Typography sx={{
                                                fontWeight: 600,
                                                marginLeft: '35px',
                                                marginTop: '3px', marginBottom: '3px',
                                                transition: 'color,marginLeft 150ms,100ms ease-in,ease-put'
                                            }}>
                                                {project.name}
                                            </Typography>
                                        </a>
                                    </Box>
                                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                        <a href={`https://github.com/${owner}/${project.name}`}>
                                            <GithubIcon sx={{ transform: 'scale(0.8)', color: 'text.secondary', transition: 'color 300ms ease-out', "&:hover": { color: 'text.primary' } }} />
                                        </a>
                                        {project.link &&
                                            <a href={project.link}>
                                                <OpenInNewIcon sx={{ transform: 'scale(0.8)', color: 'text.secondary', transition: 'color 300ms ease-out', "&:hover": { color: 'text.primary' } }} />
                                            </a>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <Divider textAlign='left'>
                    <Typography fontWeight={500} fontSize={12}>About</Typography>
                </Divider>

                <div style={{ margin: '20px' }}>
                    <Status />
                    <div>
                        <Divider textAlign='left'><Typography fontWeight={500} fontSize={12}>Links</Typography></Divider>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'end',
                            "& a": {
                                transition: 'margin-bottom 200ms',
                                marginBottom: '0px',
                                "&:hover": { marginBottom: '5px' },
                                "& button": { color: 'inherit' }
                            }
                        }}>
                            <a href='https://github.com/sharlottes'>
                                <IconButton>
                                    <GithubIcon sx={{ color: 'themedBlack' }} />
                                </IconButton>
                            </a>
                            <a href='https://discordapp.com/users/473072758629203980'>
                                <IconButton>
                                    <DiscordIcon />
                                </IconButton>
                            </a>
                            <a href='mailto:aaa9810321@gmail.com'>
                                <IconButton>
                                    <EmailIcon sx={{ color: '#c5221f' }} />
                                </IconButton>
                            </a>
                            <a href='https://velog.io/@sharlotte_04'>
                                <IconButton>
                                    <VelogIcon />
                                </IconButton>
                            </a>
                            <a href='https://open.kakao.com/o/sJxW8TUb'>
                                <IconButton>
                                    <KakaoTalkIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </a>
                        </Box>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default SideMenuDrawer;