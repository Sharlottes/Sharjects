import Fab from "@mui/material/Fab";
import Portal from "@mui/material/Portal";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ScrollFabContainer } from "./styled";

const ScrollFab: React.FC<{ target?: HTMLDivElement | undefined }> = ({
  target = global.window,
}) => {
  const scrollToTop = () => target.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    target.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <Portal>
      <ScrollFabContainer>
        <Fab size="small">
          <SwapVerticalCircleIcon />
        </Fab>
        <Fab size="small" onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </Fab>
        <Fab size="small" onClick={scrollToBottom}>
          <KeyboardArrowDownIcon />
        </Fab>
      </ScrollFabContainer>
    </Portal>
  );
};

export default ScrollFab;
