import { useRef, useEffect } from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import { motion, useAnimationControls } from "framer-motion";

interface ProgressiveTypographyProps
  extends Pick<AnimationCharProps, "speed" | "delay">,
    BoxProps {
  label: string;
}
export default function ProgressiveTypography({
  label,
  delay,
  speed,
  ...props
}: ProgressiveTypographyProps) {
  return (
    <Box display="flex" {...props}>
      {label.split("").map((char, i) => {
        return (
          <AnimationChar
            char={char}
            delay={delay}
            speed={speed}
            index={i}
            key={i}
          />
        );
      })}
    </Box>
  );
}

interface AnimationCharProps {
  speed?: number | undefined;
  delay?: number | undefined;
  index: number;
  char: string;
}
function AnimationChar({
  index,
  char,
  delay = 0,
  speed = 0.1,
}: AnimationCharProps) {
  const ref = useRef<HTMLDivElement>(null);
  const control = useAnimationControls();

  const handleDragEnd = () => {
    const data = isScreenOut(ref);
    if (!data) return;
    control.start({ x: 0, y: 0, transition: { delay: 1 } }).then(() => {
      if (char == "o") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      }
    });
  };

  useEffect(() => {
    control.start({
      opacity: 1,
      transition: { delay: index * speed + delay, duration: 0.3 },
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={control}
      drag
      dragTransition={{ power: 0.4, timeConstant: 200 }}
      onDragEnd={handleDragEnd}
      onDragTransitionEnd={handleDragEnd}
    >
      <p>{char}</p>
    </motion.div>
  );
}
function isScreenOut(ref: React.RefObject<HTMLDivElement>): boolean {
  if (!ref.current) return false;

  const rect = ref.current.getBoundingClientRect();
  const isInOfViewPoint =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  return !isInOfViewPoint;
}
