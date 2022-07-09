
import { alpha, Avatar, Badge, Chip, Divider, Grid, InputBase, Collapse, Stack, Toolbar, Typography, IconButton, Fab, Tabs, Tab } from '@mui/material';
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
import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";

import { Bot } from "koreanbots";

import Layout from "./components/Layout";
import VoteBotList from './voteList';

export default function BotListPage() {
  return <VoteBotList />
}
/*
type DiriAPI<T> = {
  code: number,
  data: T,
  version: 2
}

type DiriAPIError = {
  code: number,
  errors: string[],
  message: string,
  version: 2
}

type DiriAPIBotlist = {
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

const CollapseFab = styled(Fab)(({ theme }) => ({
  margin: '15px', 
  backgroundColor: '#7289DA', 
  position: 'absolute', 
  top: '65px',
  '&:hover': {
    backgroundColor: '#7289DA'
  },
})); 

function BotInfo(props: {bot: Bot}) {
  const bot = props.bot;
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
              .concat(bot.category.length > 5 ? <Grid item key="more..." ><Chip label={`+${bot.category.length-5}...`} variant="outlined" color="info" /></Grid> : <div key='none'></div>)}
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
}

function SearchBotList(props: {query: string}) {
  const { query } = props;

  const [error, setError] = useState('');

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>, unknown, DiriAPI<DiriAPIBotlist>, string>({
    queryKey: "infiniteCharacters",
    queryFn: async ({ pageParam = 1, meta }) => {
      const result = await fetch(`/api/v2/search/bots?query=${query}&page=${pageParam}`);

      console.log(meta);
      console.log(result);

      return result.json().then((value: DiriAPI<DiriAPIBotlist>) => {
        console.log(value);
        if(result.status === 200) {
          setError('');
        }
        else {
          setError((value as unknown as DiriAPIError).message);
        }
        
        return value;
      });
    },
    getNextPageParam: (lastPage: any, pages: string | any[]) => {
      if(pages.length < lastPage.data?.totalPage ?? 0) return pages.length + 1;
    }
  });

  return (
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
        mt='80px'
      >
      {data?.pages.map((data) => data.data?.data.map(bot => (<BotInfo bot={bot}/>)))}
      </Stack>
    </InfiniteScroll>
  )
}
/*
function VoteBotList() {
  const [error, setError] = useState('');

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>, unknown, DiriAPI<DiriAPIBotlist>, string>({
    queryKey: "infiniteCharacters",
    queryFn: async ({ pageParam = 1, meta }) => {
      const result = await fetch(`/api/v2/list/bots/votes?page=${pageParam}`);

      console.log(meta);
      console.log(result);

      return result.json().then((value: DiriAPI<DiriAPIBotlist>) => {
        console.log(value);
        if(result.status === 200) {
          setError(() => '');
        }
        else {
          setError(() => (value as unknown as DiriAPIError).message);
        }
        
        return value;
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if(pages.length < lastPage.data?.totalPage ?? 0) return pages.length + 1;
    }
  });

  return (
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
        mt='80px'
      >
      {data?.pages.map((data) => data.data?.data.map(bot => (<BotInfo bot={bot}/>)))}
      </Stack>
    </InfiniteScroll>
  )
}

*/
  /*
  const [shown, setShown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);

  const handleCollapse = async (event: React.MouseEvent) => {
    setShown(prevState => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(() => event.target.value);
  };

  const handleSubmit = async (event: React.KeyboardEvent) => {
    if(event.code === "Enter") {
      //await fetchNextPage({ cancelRefetch: true, pageParam: 1 });
    }
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  return (
    <Layout header={
      <>
        <Collapse in={shown}>
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
                value={query} 
                onChange={handleChange} 
                onKeyDown={handleSubmit}
              />
            </Search>
            <Tabs value={index} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="추천" />
              <Tab label="최신" />
              <Tab label="검색"/>
            </Tabs>
          </Toolbar>
        </Collapse>

        <CollapseFab size='medium' onClick={handleCollapse} sx={[shown && {boxShadow: 'none'}]} >
          {shown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </CollapseFab>
      </>
    }>
      {
        (()=>{
          switch(index) {
            case 0: {
              return <VoteBotList />
            }
            case 2: {
              return query && <SearchBotList query={query} />
            }
          }
        })()
      }
    </Layout>
  )
}

export default BotListPage;
  */