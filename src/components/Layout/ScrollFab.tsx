import Fab from "@mui/material/Fab";
import Portal from "@mui/material/Portal";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import S from "./ScrollFab.styled";

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
        <Fab size="small" className="main-btn" aria-label="main button">
          <SwapVerticalCircleIcon />
        </Fab>
        <Fab
          size="small"
          className="up-btn"
          aria-label="to top button"
          onClick={scrollToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
        <Fab
          size="small"
          className="down-btn"
          aria-label="to bottom button"
          onClick={scrollToBottom}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </S.ScrollFabContainer>
    </Portal>
  );
};

export default ScrollFab;
