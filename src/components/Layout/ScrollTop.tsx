import Fab from '@mui/material/Fab'
import Fade from '@mui/material/Fade'

import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop: React.FC<{ target?: HTMLDivElement | undefined }> = ({ target = global.window }) => {
  const trigger = useScrollTrigger({
    target,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    target.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Fab
        size='small'
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
}

export default ScrollTop;