import React from 'react'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { signIn, useSession } from 'next-auth/react'
import type { GithubProfile } from 'next-auth/providers/github'
import { useGithubData } from './GithubStaticDataContext'
import FetchSuspenseWrapper from './FetchSuspenseWrapper'
import useTheme from '@mui/material/styles/useTheme'
import { GithubAPIUserData } from '../@type/index';

const getPalette = (dark: boolean) => dark
  ? {
    background: '#0d1117',
    textColor: '#58a6ff',
    borderColor: '#30363d',
    iconColor: '#8b949e',
  }
  : {
    background: 'white',
    textColor: '#0969da',
    borderColor: '#d0d7de',
    iconColor: '#57606a',
  }

const GithubUserCardFetcher: React.FC<{ username: string }> = ({ username }) => {
  const { getData } = useGithubData();
  return (
    <FetchSuspenseWrapper
      fetcher={() => getData<GithubAPIUserData>(username, `users/${username}`)}
      Component={GithubUserCard}
      fetchedPropName='user'
    />
  )
}

const GithubUserCard: React.FC<{ user: GithubAPIUserData }> = ({ user }) => {
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
  }, [session])

  React.useEffect(() => {
    if (session && session.accessToken) {
      request()?.then(res => setFollowing(res.status === 204))
    }
  }, [request, session])

  const fetchFollowing = () => {
    if (session && session.accessToken)
      request(isFollowing ? 'DELETE' : 'PUT')?.then(res => res.ok && setFollowing(prev => !prev))
    else signIn('github')
  }

  const theme = useTheme();
  const palette = getPalette(theme.palette.mode === 'dark');

  return (
    <div style={{
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
      border: '1px solid',
      borderColor: palette.borderColor,
      borderRadius: '6px',
      background: palette.background,
      padding: '16px',
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#24292e',
    }}>
      <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'start', alignItems: 'start' }}>
        <Avatar src={user.avatar_url} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{user.login}</Typography>
            <Typography variant='caption' sx={{ position: 'relative', top: '-10px' }}>

              <span style={{ fontWeight: 600, color: palette.textColor }}>
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.name}
                </a>
              </span>
              {user.name ?? <span style={{ color: 'gray' }}>{"<Empty>"}</span>}
            </Typography>
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
      <Stack
        direction='row'
        spacing={2}
        divider={<Divider sx={{ color: 'gray' }} />}
        sx={{ display: 'flex', margin: '10px auto' }}
      >
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
    </div>
  )
}

export default GithubUserCardFetcher;