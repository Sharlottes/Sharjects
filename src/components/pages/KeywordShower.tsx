import React from "react";

import Typography from "@mui/material/Typography";
import { alpha, lighten } from "@mui/material/styles";

import { motion, useAnimationControls, type MotionProps } from "framer-motion";

import { delay } from "src/utils/delay";
import { getComplementaryColor } from "src/utils/getComplementaryColor";
import { lerpColor } from "../../utils/lerpColor";

export const keywords = [
  "19세 고등학생",
  "잡다한 개발자",
  "최적화와 성능의 낭만을 쫒고",
  "누군가의 노예인",
  "Sharlottes",
];

const KeywordShower: React.FC<
  Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > &
    MotionProps
> = (props) => {
  const controller = useAnimationControls();

  const startAnimation = React.useCallback(async () => {
    await delay(500);
    for (let i = 0; i < keywords.length; i++) {
      await delay(500);
      await controller.start((id) => {
        if (id === i - 1) {
          return { y: 20, opacity: 0 };
        } else if (id === i) {
          return { y: -5, opacity: 1 };
        } else {
          return {};
        }
      });
    }
  }, [controller]);

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <motion.div {...props}>
      {keywords.map((keyword, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controller}
          transition={{ duration: 0.5, type: "spring" }}
          initial={{ y: -50, opacity: 0 }}
        >
          <Typography
            sx={{
              color: (theme) =>
                alpha(
                  lerpColor(
                    theme.palette.primary.main,
                    getComplementaryColor(theme.palette.primary.main),
                    0.8
                  ),
                  0.85
                ),
              fontFamily: "Nanum Pen Script",
              fontSize: "max(17px, 4vw)",
              width: "100%",
              position: "fixed",
            }}
          >
            {keyword}
          </Typography>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KeywordShower;
