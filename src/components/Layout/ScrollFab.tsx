import Fab, { FabProps } from '@mui/material/Fab'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledFab: React.FC<FabProps> = (props) => (
  <Fab size='small' sx={{ position: 'fixed', right: 16, bottom: 16 }} {...props} />
)

const ScrollFab: React.FC<{ target?: HTMLDivElement | undefined }> = ({ target = global.window }) => {
  const scrollToTop = () => target.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => target.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <StyledFab sx={{
      position: 'fixed', right: 16, bottom: 16,
      "&>svg": {
        transition: 'all 500ms',
        opacity: 1,
      },
      "&>button": {
        transition: 'all 500ms',
        opacity: 0,
      },
      "&:hover": {
        "&>svg": {
          opacity: 0,
        },
        "&>button": {
          "&:nth-child(2)": {
            bottom: '40px'
          },
          opacity: 1
        }
      }
    }}>
      <SwapVerticalCircleIcon />
      <StyledFab onClick={scrollToTop}>
        <KeyboardArrowUpIcon />
      </StyledFab>
      <StyledFab onClick={scrollToBottom}>
        <KeyboardArrowDownIcon />
      </StyledFab>
    </StyledFab>
  );
}

export default ScrollFab;