import React from "react";

import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import {
  type AnimationControls,
  type MotionProps,
  motion,
  useAnimationControls,
} from "framer-motion";

type MotionPropsGetterType = (
  char: string,
  ref: React.RefObject<HTMLDivElement>,
  control: (x: string | number, y: string | number) => Promise<any>
) => MotionProps | undefined;

interface ProgressiveTypographyProps extends TypographyProps {
  label: string;
  speed?: number | undefined;
  delay?: number;
  motion?: MotionPropsGetterType;
  boxProps?: BoxProps | undefined;
}

const ProgressiveTypography: React.FC<ProgressiveTypographyProps> = ({
  label,
  delay = 0,
  speed = 0.1,
  motion: motionProps = motionPropsGenerator,
  boxProps,
  ...props
}) => {
  const control: AnimationControls[] = [];

  return (
    <Box style={{ display: "flex" }} {...boxProps}>
      {label.split("").map((char, i) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const c = useAnimationControls();
        const cc = useAnimationControls();
        control[i] = c;

        return (
          <motion.div key={i} animate={cc}>
            <motion.div
              custom={i}
              initial={{ opacity: 0 }}
              animate={c}
              variants={{
                show: {
                  opacity: 1,
                  transition: { delay: i * speed + delay, duration: 0.3 },
                },
              }}
              ref={ref}
              {...motionProps(char, ref, (x, y) => cc.start({ x, y }))}
            >
              <Typography {...props}>{char}</Typography>
            </motion.div>
          </motion.div>
        );
      })}
    </Box>
  );
};

function motionPropsGenerator(
  char: string,
  ref: React.RefObject<HTMLDivElement>,
  start: (x: string | number, y: string | number) => Promise<unknown>
) {
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
}
export default ProgressiveTypography;
