import type { MenuOpenData } from "./Header";

import React from "react";
import Mathf from "src/utils/Mathf";
import { useScroll, type Variant } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

type HeaderAnimationVariants = Record<
  "toLeft" | "toRight" | "both" | "blur" | "init",
  Variant
>;

const THRESHOLD = 300;

export const decideAnimation = (
  menuOpened: MenuOpenData
): keyof HeaderAnimationVariants =>
  typeof window == "undefined" || window.scrollY == 0
    ? "init"
    : menuOpened.side && menuOpened.setting
    ? "both"
    : menuOpened.side
    ? "toLeft"
    : menuOpened.setting
    ? "toRight"
    : "blur";

export const useHeaderAlphaAmount = (): number => {
  const [alphaAmount, setAlphaAmount] = React.useState(0);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const onChangeHandler = () => {
      setAlphaAmount(Mathf.clamp(scrollY.get() / THRESHOLD));
    };
    onChangeHandler();
    return scrollY.on("change", onChangeHandler);
  }, []);

  return alphaAmount;
};

export const useHeaderAnimationVariants = (): HeaderAnimationVariants => {
  const isMobile = useMediaQuery("sm");
  const demension = useWindowDimensions();
  const { scrollY } = useScroll();

  const calculateVariants = (fullWidth: number) => {
    const headerWidth = fullWidth - Math.min(400, fullWidth * 0.15);
    const gap = (fullWidth - headerWidth) / 2;
    const expandedWidth = headerWidth + gap;
    const margin = 15;

    const headerAnimateVaraints: HeaderAnimationVariants = {
      toLeft: {
        width: isMobile ? fullWidth : expandedWidth,
        x: -margin,
      },
      toRight: {
        width: isMobile ? fullWidth : expandedWidth,
        x: (isMobile ? 0 : gap) + margin,
      },
      both: {
        width: fullWidth + margin * 2,
        x: -margin,
        borderRadius: "20px",
      },
      blur: {
        width: headerWidth,
        x: gap,
        margin: `10px 0`,
        borderRadius: "20px",
      },
      init: {
        width: fullWidth,
        x: 0,
        margin: 0,
        borderRadius: "0px",
      },
    };

    return headerAnimateVaraints;
  };
  const [variants, setVariants] = React.useState<HeaderAnimationVariants>(
    calculateVariants(demension.offsetWidth)
  );

  const latestScrollY = React.useRef(0);
  React.useEffect(() => {
    const onChangeHandler = (latestValue: number) => {
      if (latestScrollY.current != latestValue) {
        latestScrollY.current = latestValue;
        setVariants(calculateVariants(demension.offsetWidth));
      }
    };
    setVariants(calculateVariants(demension.offsetWidth));

    return scrollY.on("change", onChangeHandler);
  }, [demension.offsetWidth]);

  return variants;
};
