import React from 'react'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { signIn, useSession } from 'next-auth/react'
import type { GithubProfile } from 'next-auth/providers/github'

const ContributorCard: React.FC<{ user: GithubProfile }> = ({ user }) => {
  const [isFollowing, setFollowing] = React.useState(false);
  const { data: session } = useSession();
  const request = React.useCallback((method: string = 'GET') => {
    if (!(session && session.accessToken) || user.name === session?.user?.name) return;

    return fetch(`https://api.github.com/user/following/${user.login}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${session.accessToken}`
      }
    })
  }, [session, user.login, user.name])

  React.useEffect(() => {
    if (session && session.accessToken) {
      request()?.then(res => setFollowing(res.status === 204))
    }
  }, [request, session])

  const fetchFollowing = () => {
    if (session && session.accessToken) 
      request(isFollowing ? 'DELETE' : 'PUT')?.then(res => res.ok&&setFollowing(prev => !prev))
    else signIn('github')
  }

  return (
    <Box sx={{
      width: 270,
      transition: 'transform 300ms ease-in-out', 
      '&:hover': {
        transform: 'scale(1.05)'
      },
      "&:hover::after": {
        opacity: 1
      },
      '&::after': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        top: 0,
        left: 0,
        content: '""',
        borderRadius: '4px',
        boxShadow: '0px 10px 48px -4px rgba(0,0,0,0.75)',
        opacity: 0,
        transition: 'opacity 300ms ease-in-out'
      }
    }}
    component='div' 
    onClick={(e: React.MouseEvent<HTMLDivElement>)=>{
      if((e.target as any).id !== 'followbtn') window.open(`https://github.com/${user.login}`, "_blank")
    }}>
      <Paper sx={{ height: '180px', pt: '5px' }}>
        <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'start', alignItems: 'start' }}>
          <Avatar src={user.avatar_url} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{user.login}</Typography>
              <Typography variant='caption' sx={{ position: 'relative', top: '-10px' }}>{user.name ?? <span style={{ color: 'gray' }}>{"<Empty>"}</span>}</Typography>
            </div>
            <Button
              id='followbtn'
              size='small'
              variant='outlined'
              onClick={fetchFollowing}
              sx={{ marginRight: 2, height: '35px' }}
              disabled={user.name === session?.user?.name}
            >
              {isFollowing ? "UnFollow" : "Follow"}
            </Button>
          </div>
        </div>
        <Stack direction='row' spacing={2} divider={<Divider sx={{color: 'gray'}} />} sx={{ display: 'flex', ml: '10px', mr: '10px' }}>
          {[
            [user.public_repos, 'REPOS'],
            [user.public_gists, 'GISTS'],
            [user.followers, 'FOLLOWERS']
          ].map(([value, name], i) =>
            <div key={i}>
              <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>{value}</Typography>
              <Typography>{name}</Typography>
            </div>
          )}
        </Stack>
        <Typography variant='body1' sx={{ ml: '5px' }}>{user.bio}</Typography>
      </Paper>
    </Box>
  )
}

const Contributors: React.FC<{ users: GithubProfile[] }> = ({ users }) => {
  const [scroll, setScroll] = React.useState(0)
  const [scrollDirection, setScrollDirection] = React.useState<'left'|'right'|'none'>('none')
  const interval = React.useRef<NodeJS.Timer>()

  React.useEffect(() => {
    if(interval.current) clearInterval(interval.current)

    interval.current = setInterval(()=>{
      if(scrollDirection === 'none') return;
      setScroll(prev=>Math.max(0, Math.min(3, prev + 0.05 * (scrollDirection === 'left' ? -1 : 1))))
    }, 10)

    return () => clearInterval(interval.current)
  }, [scrollDirection])

  return (<>
    <Box component={'div'} sx={{
      width: '100%', height: 200, 
      "& .scrollbtn": {
        position: 'absolute',
        width: 25, height: 200, zIndex: 99, 
        backgroundColor: 'rgb(0,0,0,.3)',
        opacity: scrollDirection !== 'none' ? 1 : 0, transition: 'opacity 200ms', 
        "&:hover": { opacity: 1 }
      } 
    }}>
      <Button 
        className='scrollbtn'
        sx={{float: 'left', left: -10 }} 
        onMouseEnter={()=>setScrollDirection('left')} 
        onMouseLeave={()=>setScrollDirection('none')}
      > <KeyboardArrowLeftIcon /> </Button>
      <div style={{position: 'absolute', left: -1*270*scroll, overflowX: 'clip'}}>
        <Stack direction='row' spacing={2} alignItems='center' justifyItems='center' sx={{pl: 3, mr: 2,}}>
          {users && users.map((user, i) => <ContributorCard key={user.login} user={user} />)}
        </Stack>
      </div>
      <Button 
        className='scrollbtn'
        sx={{float: 'right', right: -10 }}
        onMouseEnter={()=>setScrollDirection('right')} 
        onMouseLeave={()=>setScrollDirection('none')}
      > <KeyboardArrowRightIcon /> </Button>
    </Box>
  </>)
}

export default Contributors