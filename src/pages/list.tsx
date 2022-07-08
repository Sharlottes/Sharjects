import { alpha, Avatar, Badge, Chip, Divider, Grid, InputBase, Collapse, Stack, Toolbar, Typography, IconButton, Fab } from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import DnsIcon from '@mui/icons-material/Dns';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, MouseEvent } from "react";
import { useInfiniteQuery } from "react-query";

import { Bot } from "koreanbots";

import Layout from "./components/Layout";

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


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function BotListPage() {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>>(
    "infiniteCharacters",
    async ({ pageParam = 1}) => await fetch(
      `/api/v2/list/bots/votes?page=${pageParam}`
    ).then((result) => {
      console.log(result);
      return result.json();
    }),
    {
      getNextPageParam: (lastPage, pages) => {
        if(lastPage) return pages.length + 1;
      },
    }
  );
  const [shown, setShown] = useState(true);

  const handleCollapse = (event: MouseEvent) => {
    setShown(!shown);
  };
  
  const handleCollapseEnd = (node: HTMLElement, done: () => void) => {

  }

  return (
    <Layout header={
      <>
        <Collapse in={shown} addEndListener={handleCollapseEnd}>
          <Toolbar sx={{backgroundColor: '#7289DA'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="collapse up"
              sx={{ mr: 2 }}
              onClick={handleCollapse}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </Collapse>

      {
        <Fab size='medium' onClick={handleCollapse} sx={[
          { 
            margin: 1.5, 
            backgroundColor: '#7289DA', 
            position: 'absolute', 
            top: '65px'
          },
          {
            '&:hover': {
              backgroundColor: '#7289DA'
            }
          },
          shown && {
            boxShadow: 'none'
          }
        ]} >
          {shown ? <KeyboardArrowDownIcon /> : <KeyboardArrowDownIcon />}
        </Fab>
      }
      </>
    }>
      {status && 
        <InfiniteScroll
          dataLength={(data?.pages.length ?? 0) * 20}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={<h4>Loading...</h4>}
        >
          <Stack 
            direction='column' 
            spacing={2} 
            justifyContent="flex-start" 
            alignItems="stretch" 
            divider={<Divider flexItem />}
            m='20px'
          >
          {
            data?.pages.map((data) => {
              return data.data.data.map(bot => (
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
              ))
            })
          }
          </Stack>
        </InfiniteScroll>
      }
    </Layout>
  )
}

export default BotListPage;