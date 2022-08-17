import React from 'react'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import usePreventBodyScroll from "src/hooks/usePreventBodyScroll";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { signIn, useSession } from 'next-auth/react'
import type { GithubProfile } from 'next-auth/providers/github'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

let timeout: NodeJS.Timeout | undefined;
const ContributorsHeader: React.FC = () => {
  const {
    scrollPrev,
    scrollNext,
    isFirstItemVisible,
    isLastItemVisible,
    scrollContainer
  } = React.useContext(VisibilityContext);

  React.useEffect(() => {
    if (timeout) clearTimeout(timeout)
    if (document.activeElement === scrollContainer.current) return
    timeout = setTimeout(() => {
      if (isFirstItemVisible && !isLastItemVisible) scrollNext()
      if (!isFirstItemVisible && isLastItemVisible) scrollPrev()
    }, 10000)
  }, [scrollNext, scrollPrev, isFirstItemVisible, isLastItemVisible, scrollContainer])

  return <></>
}

const ContributorCard: React.FC<{ user: GithubProfile }> = ({ user }) => {
  const [isFollowing, setFollowing] = React.useState(false)
  const { data: session } = useSession();

  const request = React.useCallback((method: string = 'GET') => {
    if (!(session && session.accessToken)) return;

    return fetch(`https://api.github.com/user/following/${user.login}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${session.accessToken}`
      }
    })
  }, [session, user.login])

  React.useEffect(() => {
    if (session && session.accessToken) {
      request()?.then(res => setFollowing(res.status === 204))
    }
  }, [request, session])

  const fetchFollowing = () => {
    if (session && session.accessToken) {
      request(isFollowing ? 'DELETE' : 'PUT')
        ?.then(async res => {
          if(res.ok) setFollowing(prev => !prev)
        })
        .catch(console.log)
    }
    else signIn()
  }
  return (
    <Paper sx={{ height: '180px', marginLeft: '10px', paddingTop: '5px' }}>
      <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'start', alignItems: 'start' }}>
        <Avatar src={user.avatar_url} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{user.login}</Typography>
            <Typography variant='caption' sx={{ position: 'relative', top: '-10px' }}>{user.name ?? <span style={{ color: 'gray' }}>{"<Empty>"}</span>}</Typography>
          </div>
          <Button
            size='small'
            variant='outlined'
            onClick={fetchFollowing}
            sx={{ marginRight: 2, height: '35px' }}
            disabled={user.name == session?.user?.name}
          >
            {isFollowing ? "UnFollow" : "Follow"}
          </Button>
        </div>
      </div>
      <Stack direction='row' spacing={2} divider={<Divider />} sx={{ display: 'flex', ml: '10px', mr: '10px' }}>
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
  )
}

const Contributors: React.FC<{ users: GithubProfile[] }> = ({ users }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const onWheel = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent) => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

  return (
    <div 
      onMouseEnter={disableScroll} 
      onMouseLeave={enableScroll}>
      <Box
      sx={{
        "& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar": {
          display: 'none'
        },
        "& .react-horizontal-scrolling-menu--scroll-container": {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
        marginRight: '10px',
      }}>
        <ScrollMenu Header={<ContributorsHeader />} onWheel={onWheel}>
          {users && users.map((user, i) => <ContributorCard key={i} user={user} />)}
        </ScrollMenu>
      </Box>
    </div>
  )
}

export default Contributors