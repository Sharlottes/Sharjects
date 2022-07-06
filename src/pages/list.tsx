import { Avatar, Badge, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import Layout from "./components/Layout";
import { styled } from '@mui/material/styles';
import { Bot } from "koreanbots";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DnsIcon from '@mui/icons-material/Dns';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import useFetch from '../hooks/useFetch';
import { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react';
import axios from "axios";

export type DiriAPI<T> = {
  code: number,
  data: T,
  version: 2
}

export type DiriAPIBotlist = {
  type: string,
  data: Bot[],
  currentPage: number,
  totalPage: number
}


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function BotListPage(props: {bots: Bot[]}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page, props.bots);
  const loader = useRef(null);
  //TODO: 검색창 추가
  const handleChange = (e: ChangeEvent) => setQuery("uhh????");

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
  console.log(page);
    if(target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect in BotListPage');
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if(loader.current) observer.observe(loader.current);
    console.log(list);
  }, [handleObserver, list]);
  
  console.log(error);

  return (
    <Layout>
      <input type="text" value={query} onChange={handleChange} />
      <Stack 
        direction='column' 
        spacing={2} 
        justifyContent="flex-start" 
        alignItems="stretch" 
        divider={<Divider flexItem />}
        mt='20px'
        mr='10px'
      >
        {
          list.map((bot: Bot) => {
            return (
              <Stack 
                direction='row' 
                spacing={1} 
                key={bot.id} 
                sx={{backgroundImage: `url(${bot.bg})`}}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={bot.status === 'online' ? 'success' : bot.status === 'idle' ? 'warning' : bot.status === 'streaming' ? 'secondary' : bot.status === 'dnd' ? 'error' : 'default' }
                  sx={{width: 40, height: 40}}
                >
                  <Avatar src={(bot.avatar ? `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png` : "https://styles.redditmedia.com/t5_3b1wr/styles/communityIcon_qdbg6bz0bud71.png?width=256&s=ccf3d06bf3b8056f312f207c7ce906cf69af6efd")}/>
                </StyledBadge>

                <Stack 
                  direction='column' 
                  spacing={1}
                  alignItems='start'
                >
                  <Grid container spacing={0.5}>
                    <Grid item display='flex'>
                      <Typography variant="h5" noWrap>{bot.name}</Typography>
                      <Typography variant="body2" pt='10px'>{`#${bot.tag}`}</Typography>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={0.5}>
                      {bot.category.slice(0, 5)
                        .map((category: string, i: number) => <Grid item key={i} ><Chip label={`#${category}`} variant="outlined" color="primary" /></Grid>)
                        .concat(bot.category.length > 5 ? <Grid item key="more..." ><Chip label={`+${bot.category.length-5}...`} variant="outlined" color="info" /></Grid> : <></>)}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item mr='5px'><Chip label={`${bot.votes}`} icon={<FavoriteIcon />} size="small" /></Grid>
                    {bot.servers ? <Grid item mr='5px'><Chip label={`${bot.servers}`} icon={<DnsIcon />} size="small" /></Grid> : <></>}
                    {bot.shards ? <Grid item mr='5px'><Chip label={`${bot.shards}`} icon={<ShareIcon />} size="small" /></Grid> : <></>}
                    <Grid item mr='5px'><Chip label={`${bot.lib}`} size="small" /></Grid>
                    <Grid item><Chip label={`${bot.prefix}`} size="small" /></Grid>
                  </Grid>
                  
                  {bot.vanity ? <Chip label={`https://discord.gg/${bot.vanity}`} variant="outlined" color="info" size="small" onClick={()=>window.open(`https://discord.gg/${bot.vanity}`, '_blank')} icon={<LinkIcon />} /> : <></>}
                  
                  <Grid container>
                    {bot.discord ? <Grid item mr='12px'><Button variant="outlined" color="primary" startIcon={<AddIcon />} href={`https://discord.gg/${bot.discord}`}>Server Join</Button></Grid> : <></>}
                    {bot.url ? <Grid item><Button variant="outlined" color="secondary" startIcon={<AddIcon />} href={bot.url}>Bot Invite</Button></Grid> : <></>}
                  </Grid>

                  <Typography mt='12px' pr='24px'>{bot.intro}</Typography>
                </Stack>
              </Stack>
            )
          })
        }
      </Stack>
      {loading ? <Typography>Loading...</Typography> : <></>}
      {error ? <Typography>Error!</Typography> : <></>}
      <div ref={loader} />
    </Layout>
  )
}


BotListPage.getInitialProps = async () => {
  const res = await axios.get('https://koreanbots.dev/api/v2/list/bots/votes');
  const data: DiriAPI<DiriAPIBotlist> = res.data;
  
  return {
    bots: data.data.data
  }
}


export default BotListPage;