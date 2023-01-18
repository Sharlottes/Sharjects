import React from "react";
import ProgressiveTypography from "src/components/ProgressiveTypography";
import { MainTitleContainer } from "./styled";

const motionPropsGenerator = (
  char: string,
  ref: React.RefObject<HTMLDivElement>,
  start: (x: string | number, y: string | number) => Promise<unknown>
) => {
  const check = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (!ref.current || !rect) return;
    const isInOfViewPoint =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    if (isInOfViewPoint) return;
    const reverse = (str: string) =>
      str.includes("-") ? str.replace("-", "") : "-" + str;
    const [x, y] = ref.current.style.transform
      .replace(/translate[X|Y]\((-?\d*.\d*)px\)/g, "$1")
      .split(/\s/)
      .slice(0, 2)
      .map((str) => parseFloat(reverse(str)));

    start(x, y).then(() => {
      if (char == "o")
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    });
  };
  return {
    animate: "show",
    drag: true,
    dragTransition: { power: 0.4, timeConstant: 200 },
    onDragEnd: check,
    onDragTransitionEnd: check,
  };
};

const MainTitle: React.FC = () => (
  <MainTitleContainer>
    <ProgressiveTypography
      variant="h1"
      label="Sharlotte"
      fontWeight="bold"
      fontSize="max(4rem, 10vw)"
      motion={motionPropsGenerator}
    />
  </MainTitleContainer>
);

export default MainTitle;
