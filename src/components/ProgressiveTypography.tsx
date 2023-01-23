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
  motion: motionProps = () => {},
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
export default ProgressiveTypography;
