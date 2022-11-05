import React from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import GithubUserCardFetcher from 'src/components/GithubUserCard'

const Contributors: React.FC<{ users: string[] }> = ({ users }) => {
  const [scroll, setScroll] = React.useState(0)
  const [scrollDirection, setScrollDirection] = React.useState<'left' | 'right' | 'none'>('none')
  const interval = React.useRef<NodeJS.Timer>()

  const userCards = React.useMemo(() =>
    users.map((user, i) =>
      <GithubUserCardFetcher key={i} username={user} />
    ),
    []
  );

  React.useEffect(() => {
    if (interval.current) clearInterval(interval.current)

    interval.current = setInterval(() => {
      if (scrollDirection === 'none') return;
      setScroll(prev => Math.max(0, Math.min(3, prev + 0.05 * (scrollDirection === 'left' ? -1 : 1))))
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
        sx={{ float: 'left', left: -10 }}
        onMouseEnter={() => setScrollDirection('left')}
        onMouseLeave={() => setScrollDirection('none')}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <div style={{ position: 'absolute', left: -270 * scroll, overflowX: 'clip' }}>
        <Stack direction='row' spacing={2} alignItems='center' justifyItems='center' sx={{ pl: 3, mr: 2 }}>
          {userCards}
        </Stack>
      </div>
      <Button
        className='scrollbtn'
        sx={{ float: 'right', right: -10 }}
        onMouseEnter={() => setScrollDirection('right')}
        onMouseLeave={() => setScrollDirection('none')}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  </>)
}

export default Contributors