import { Avatar, Badge, Chip, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component } from "react";
import Layout from "./components/Layout";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Bot } from "koreanbots";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DnsIcon from '@mui/icons-material/Dns';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

type DiriAPI<T> = {
  code: number,
  data: T,
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

export default class BotListPage extends Component<{ bots: Bot[] }> {
  public static async getInitialProps() {
    const res = await axios.get('https://koreanbots.dev/api/v2/list/bots/votes');
    const data: DiriAPI<DiriAPIBotlist> = res.data;
    return {
      bots: data.data.data
    }
  }

  render(): JSX.Element {
    return (
      <Layout>
        {
          this.props.bots.map((bot: Bot) => {
            return (
              <div key={bot.id}>
                <Box sx={{width: '100vw', margin: '12px', display:'flex', 'background-image': `url(${bot.bg})`}}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color={bot.status === 'online' ? 'success' : bot.status === 'idle' ? 'warning' : bot.status === 'streaming' ? 'secondary' : bot.status === 'dnd' ? 'error' : 'default' }
                    sx={{width: 40, height: 40, 'margin-right': '10px'}}
                  >
                    <Avatar src={(bot.avatar ? `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png` : "https://styles.redditmedia.com/t5_3b1wr/styles/communityIcon_qdbg6bz0bud71.png?width=256&s=ccf3d06bf3b8056f312f207c7ce906cf69af6efd")}/>
                  </StyledBadge>
                  <Box sx={{display: 'block'}}>
                    <Box sx={{display: 'flex'}}>
                      <Typography variant="h5">{bot.name}</Typography>
                      <Typography variant="body2" sx={{'padding-top': '10px'}}>{`#${bot.tag}`}</Typography>
                      {bot.category.map((category: string, i: number) => <Chip key={i} label={`#${category}`} variant="outlined" color="primary" sx={{'margin-left': '5px', 'margin-right': '5px'}} />)}
                    </Box>
                    <Box sx={{display: 'flex', 'margin-top': '5px'}}>
                      <Chip label={`${bot.votes}`} icon={<FavoriteIcon />} size="small" sx={{'margin-left': '5px', 'margin-right': '5px'}} />
                      <Chip label={`${bot.servers??0}`} icon={<DnsIcon />} size="small" sx={{'margin-left': '5px', 'margin-right': '5px'}} />
                      <Chip label={`${bot.shards??0}`} icon={<ShareIcon />} size="small" sx={{'margin-left': '5px', 'margin-right': '5px'}} />
                      <Chip label={`${bot.lib}`} size="small" sx={{'margin-left': '5px', 'margin-right': '5px'}} />
                      <Chip label={`${bot.prefix}`} size="small" sx={{'margin-left': '5px', 'margin-right': '5px'}} />
                    </Box>

                    {bot.vanity ? <Chip label={`https://discord.gg/${bot.vanity}`} variant="outlined" color="info" size="small" onClick={()=>window.open(`https://discord.gg/${bot.vanity}`, '_blank')} icon={<LinkIcon />} sx={{'margin-top': '10px'}} /> : <></>}
                   
                    <Box sx={{display: 'flex', 'margin-top': '5px'}}>
                      {bot.discord ? <Button variant="outlined" color="primary" startIcon={<AddIcon />} sx={{margin: '5px'}} href={`https://discord.gg/${bot.discord}`}>Server Join</Button> : <></>}
                      {bot.url ? <Button variant="outlined" color="secondary" startIcon={<AddIcon />} sx={{margin: '5px'}} href={bot.url}>Bot Invite</Button> : <></>}
                    </Box>
                    <Typography sx={{'margin': '12px', 'margin-bottom': '0px'}}>{bot.intro}</Typography>
                  </Box>
                </Box>
                <Divider />
              </div>
            )
          })
        }
      </Layout>
    )
  }
}