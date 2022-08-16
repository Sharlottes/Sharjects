import React from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import Layout from 'components/Layout'
import Divider from '@mui/material/Divider';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Button } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import type { Session } from 'next-auth/core/types'

interface User {
  login: string,
  name: string,
  avatar_url: string,
  html_url: string,
  bio: string,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

//github repo api로 가져올 바에야 직접 쓰는게 더 빠르고 리밋 부담 감소
const contributors = ['Sharlottes', 'AmateurPotion', 'younggam', 'sk7725']

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

const ContributorCard: React.FC<{ user: User }> = ({ user }) => {
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
      request(isFollowing ? 'DELETE' : 'PUT')?.then(async res => console.log('result: ', await res.json(), ' status: ', res.status)).catch(console.log)
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
            disabled={user.name === (session?.name as string | undefined)?.trim()}
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

const Contributors: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <Box sx={{
      "& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar": {
        display: 'none'
      },
      "& .react-horizontal-scrolling-menu--scroll-container": {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      mr: '10px',
    }}>
      <ScrollMenu Header={<ContributorsHeader />} onWheel={onWheel}>
        {users && users.map((user, i) => <ContributorCard key={i} user={user} />)}
      </ScrollMenu>
    </Box >
  )
}

const CardDefensePage: React.FC<{ users: User[] }> = ({ users }) =>
  <Layout>
    <Stack direction='column' sx={{ display: 'flex', width: '100vw' }}>
      <Paper elevation={5} sx={{ boxShadow: '5px 5px 10px' }}>
        <div style={{ marginLeft: '20px', height: '300px' }}>
          <Typography fontSize='min(12vw, 140px)' sx={{ fontWeight: 'bold' }}>CardDefense</Typography>
          <Typography variant='body1' sx={{ width: '50vw', ml: '24px', overflowWrap: 'break-word' }}>엔트로피아 / 아이푸토로 2개의 작품으로 나누어져 배포될 카드디펜스 게임시리즈로서 모험을 통해 카드를 수집하고 디펜스를 하는 게임</Typography>
        </div>
      </Paper>
      <Paper elevation={5} style={{ marginTop: '50px', width: '100vw', backgroundColor: 'black', color: 'white' }}>
        <div style={{ margin: '10px 10px 30px 20px' }}>
          <Typography fontSize='min(6vw, 70px)' sx={{ fontWeight: 'bold', mt: '5px' }}>Contributors</Typography>
          <Typography variant='subtitle1' sx={{ ml: '20px', mb: '20px' }}>이 프로젝트를 개발중이신 분들</Typography>
          <Contributors users={users} />
        </div>
      </Paper>
    </Stack>
  </Layout>


export async function getServerSideProps() {
  const users: User[] = [];
  for await (const username of contributors) {
    users.push(await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_REST_PAT}`
      }
    }).then(
      data => data.json(),
      err => console.log('failed to get user data: ', err)
    ))
  }
  return {
    props: { users },
  }
}

export default CardDefensePage