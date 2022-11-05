import React from 'react'

import Fab from '@mui/material/Fab'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'

import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop: React.FC<{ target?: HTMLDivElement | undefined }> = ({ target = global.window }) => {
  const trigger = useScrollTrigger({
    target,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const anchor = evt.currentTarget.ownerDocument.querySelector<HTMLDivElement>('div #back-to-top-anchor');
    target.scrollTo({ top: anchor?.offsetTop ?? 0 });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollTop;