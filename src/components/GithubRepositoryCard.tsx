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

interface GithubRepositry {
  name: string,
  full_name: string,
  avatar_url: string,
  owner: {
    login: string
  }
}

const fetchGithubRepository = (repositoryName: string, author = 'Sharlottes') => {
  let repository: GithubProfile | null = null;
  const suspender = fetch(`https://api.github.com/repos/${author}/${repositoryName}`, {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_REST_PAT}`
    }
  }).then(
    data => data.json().then<GithubProfile>(r => repository = r),
    err => console.log('failed to get repository data: ', repository)
  )
  return () => {
    if (repository) return repository;
    else throw suspender;
  }
};

const GithubRepositoryCardFetcher: React.FC<{ repository: string }> = ({ repository }) => {

  return (
    <React.Suspense fallback={<>loading...</>}>
      <GithubRepositoryCard fetcher={fetchGithubRepository(repository)} />
    </React.Suspense>
  )
}

const GithubRepositoryCard: React.FC<{ fetcher: () => GithubProfile }> = ({ fetcher }) => {
  const user = fetcher();

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
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as any).id !== 'followbtn') window.open(`https://github.com/${user.login}`, "_blank")
      }}>
      <Paper sx={{ minHeight: '180px', padding: '10px' }}>
        <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'start', alignItems: 'start' }}>
          <Avatar src={user.avatar_url} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{user.login}</Typography>
              <Typography variant='caption' sx={{ position: 'relative', top: '-10px' }}>
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
      </Paper>
    </Box>
  )
}

export default GithubRepositoryCardFetcher;