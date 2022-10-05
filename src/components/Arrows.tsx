import { styled } from "@mui/system";
import Button from '@mui/material/Button'
import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ScrollButton = styled(Button)(()=>({
  width: '20px', height: '200px',
  position: 'absolute',
  zIndex: 999,
  color: 'rgba(0, 0, 0, 0)', 
  transition: 'background-color 300ms',
  "&:hover": {
    backgroundColor: 'rgba(100, 100, 100, .3)',
    color: 'rgba(50, 50, 50, .5)'
  }
}))

export const LeftArrow: React.FC = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
  <ScrollButton onClick={() => scrollPrev()}>
    <ArrowBackIosIcon />
  </ScrollButton>
  );
}

export const RightArrow: React.FC = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
  <ScrollButton onClick={() => scrollNext()} sx={{ right: '15px' }}>
    <ArrowForwardIosIcon />
  </ScrollButton>
  );
}