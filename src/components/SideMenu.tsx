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
import EmailIcon from '@mui/icons-material/Email'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { DiscordIcon, GithubIcon } from 'src/assets/icons'
import { projectDataType } from 'src/@type'
import { Dialog, DialogProps, DialogTitle, useTheme } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { useThemeController } from './MainThemeProvider'

const monthes = ['월', '화', '수', '목', '금', '토', '일'];
const date = new Date();
const dateCode = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

function parseDate(str: string): string {
    const date = new Date(`${str.slice(0, 4)} ${str.slice(4, 6)} ${str.slice(6, 8)}`);
    return `${date.getMonth() + 1}/${date.getDate()} (${monthes[date.getUTCDay()]})`
}

const GraphDialog: React.FC<DialogProps & { data: Record<string, number> }> = ({ data: visitors, ...props }) => {
    const entries = Object.entries(visitors);
    const data = {
        datasets: [
            {
                type: 'line' as const,
                label: 'Dataset 1',
                data: entries.slice(Math.max(0, entries.length - 7)).map(([date, amount]) => ({ x: parseDate(date), y: amount })),
                borderColor: 'green',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
    }

    return (
        <Dialog {...props}>
            <DialogTitle><Typography fontWeight={500} fontSize={15}>조회수 그래프</Typography></DialogTitle>
            <Line data={data} options={options} style={{ padding: '20px' }} />
        </Dialog>
    )
}


const projectData: Array<projectDataType> = require('./pages/sections/projectData.json');

const Status: React.FC = () => {
    const [visitors, setVisitors] = React.useState<Record<string, number>>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            setVisitors(await fetch('/api/visit').then(res => res.json()));
        })();
    }, []);

    return (
        <>
            <Divider textAlign='left'><Typography fontWeight={500} fontSize={12}>Visitors</Typography></Divider>
            <div style={{ marginLeft: '10px', fontSize: 12, fontWeight: 500 }}>
                {visitors
                    ? <>
                        이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고,<br />
                        총 {Object.values(visitors).reduce((a, e) => a + e, 0)}번 조회되었어요.
                    </>
                    : <>방문자 불러오는 중...{/* TODO-이거 애니메이팅하는 Typography 만들까 */}</>
                }
                <span style={{ display: 'inline', color: 'blue', cursor: 'pointer' }} onClick={() => setDialogOpen(true)}>
                    그래프 보기
                </span>
            </div>
            {visitors
                ?
                <GraphDialog
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
        </>
    )
}
const SideMenuDrawer: React.FC = () => {
    const theme = useTheme();
    let { currentColors } = useThemeController();

    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100%', width: '100%' }}>
            <Container sx={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '10px', width: '100' }}>
                    <Link href='/'>
                        <Typography sx={{ fontWeight: 800, fontSize: 20, textAlign: 'left', transition: 'color 150ms ease-in', "&:hover": { color: currentColors[600] } }}>
                            Sharlotte's Portfolio
                        </Typography>
                    </Link>
                    <Typography variant='body2' textAlign='right' sx={{ marginLeft: '5px' }}>the first portfolio</Typography>
                </div>

                <Divider />

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
                                <img src={`images/profile/${owner}.png`} width='20px' height='20px' alt='' style={{ borderRadius: '20px', marginRight: '5px' }} />
                                <Link href={`https://github.com/${owner}`}>
                                    <Typography sx={{
                                        fontWeight: 500, fontsize: 16, textAlign: 'left',
                                        transition: 'color 150ms ease-in'
                                    }}>{owner}</Typography>
                                </Link>
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
                                        <Link href={`/projects/${project.name}`}>
                                            <Typography sx={{
                                                fontWeight: 600,
                                                marginLeft: '35px',
                                                marginTop: '3px', marginBottom: '3px',
                                                transition: 'color,marginLeft 150ms,100ms ease-in,ease-put'
                                            }}>
                                                {project.name}
                                            </Typography>
                                        </Link>
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
            </Container>
            <div style={{ width: '100%', marginBottom: '10px' }}>
                <Box sx={{ padding: '20px' }}>
                    <Status />
                </Box>
                <Divider textAlign='left'>
                    <Typography fontWeight={500} fontSize={12}>About</Typography>
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'end', "& a": { transition: 'margin-bottom 200ms', marginBottom: '0px', "&:hover": { marginBottom: '5px' } } }}>
                    <a href='https://github.com/sharlottes'>
                        <IconButton sx={{ color: 'default' }}>
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