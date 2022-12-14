import Fab from '@mui/material/Fab'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';

const ScrollFab: React.FC<{ target?: HTMLDivElement | undefined }> = ({ target = global.window }) => {
  const scrollToTop = () => target.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => target.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <Box sx={{
      position: 'fixed', right: 16, bottom: 48,
      width: 40, height: 40,
      zIndex: 9999,
      "& button": {
        position: 'fixed', right: 16, bottom: 48,
        transition: 'all 500ms',
        "&:not(:nth-child(1))": {
          opacity: 0,
        },
        "&:nth-child(1)": {
          zIndex: 9998,
          opacity: 1,
        }
      },
      "&:hover": {
        "& button": {
          "&:nth-child(1)": {
            opacity: 0,
            zIndex: 9998,
            pointerEvents: 'none'
          },
          "&:nth-child(2)": {
            opacity: 1,
            transform: 'translateY(-24px)',
          },
          "&:nth-child(3)": {
            opacity: 1,
            transform: 'translateY(24px)',
          },
        }
      }
    }}>
      <Fab size='small'>
        <SwapVerticalCircleIcon />
      </Fab>
      <Fab size='small' onClick={scrollToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
      <Fab size='small' onClick={scrollToBottom}>
        <KeyboardArrowDownIcon />
      </Fab>
    </Box>
  );
}

export default ScrollFab;