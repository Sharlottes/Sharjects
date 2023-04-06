import Fab from "@mui/material/Fab";
import Portal from "@mui/material/Portal";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as S from "./ScrollFab.styled";

export interface ScrollFabProps {
  target?: Element | undefined;
}

const ScrollFab: React.FC<ScrollFabProps> = ({ target = global.window }) => {
  const scrollToTop = () => target.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    target.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <Portal>
      <S.ScrollFabContainer>
        <Fab size="small" className="main-btn">
          <SwapVerticalCircleIcon />
        </Fab>
        <Fab size="small" className="up-btn" onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </Fab>
        <Fab size="small" className="down-btn" onClick={scrollToBottom}>
          <KeyboardArrowDownIcon />
        </Fab>
      </S.ScrollFabContainer>
    </Portal>
  );
};

export default ScrollFab;
