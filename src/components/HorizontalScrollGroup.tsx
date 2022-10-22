import React from "react";

import Button from '@mui/material/Button'
import { styled } from "@mui/system";
import Box from '@mui/material/Box'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { VisibilityContext, ScrollMenu } from "react-horizontal-scrolling-menu";
import usePreventBodyScroll from "src/hooks/usePreventBodyScroll";

const ScrollButton = styled(Button)(() => ({
  width: '20px', height: '200px',
  position: 'absolute',
  zIndex: 666,
  color: 'rgba(0, 0, 0, 0)',
  transition: 'background-color 300ms',
  "&:hover": {
    backgroundColor: 'rgba(100, 100, 100, .3)',
    color: 'rgba(50, 50, 50, .5)'
  }
}))

const LeftArrow: React.FC = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <ScrollButton onClick={() => scrollPrev()}>
      <ArrowBackIosIcon />
    </ScrollButton>
  );
}

const RightArrow: React.FC = () => {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <ScrollButton onClick={() => scrollNext()} sx={{ right: '15px' }}>
      <ArrowForwardIosIcon />
    </ScrollButton>
  );
}

const onWheel = (apiObj: React.ContextType<typeof VisibilityContext>, ev: React.WheelEvent) => {
  if (Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15) {
    ev.stopPropagation();
  }
  else if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HorizontalScrollGroup: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        "& .react-horizontal-scrolling-menu--scroll-container": {
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        },
      }}
      onMouseEnter={disableScroll} onMouseLeave={enableScroll}
    >
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
        {children}
      </ScrollMenu>
    </Box>
  )
}

export default HorizontalScrollGroup;