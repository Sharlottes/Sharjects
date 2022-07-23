import { useScrollTrigger, Fade, Box } from '@mui/material'

interface ScrollTopProps {
  children: React.ReactElement
}

const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    target: global.window,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const anchor = evt.currentTarget.ownerDocument.querySelector('#back-to-top-anchor')

    anchor?.scrollIntoView({
      block: 'center',
    })
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  )
}

export default ScrollTop