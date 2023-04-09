import React from "react";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

import { useScroll, type Variants } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const useHeaderAnimationVariants = (
  onVariantsChanged: (newestVariant: Variants) => void
): Variants => {
  const isMobile = useMediaQuery("sm");
  const demension = useWindowDimensions();
  const { scrollY } = useScroll();

  const calculateVariants = (width: number) => {
    const headerWidth = width - Math.min(400, width * 0.15);
    const widthWithSidebar = (width + headerWidth) / 2 + 20;
    const leftAmount = (width - headerWidth) / 2;

    const headerAnimateVaraints = {
      sidebar: {
        width: isMobile ? width + 30 : widthWithSidebar,
        left: isMobile ? -15 : -20,
        margin: `10px 0`,
        borderRadius: "20px",
      },
      blur: {
        width: headerWidth,
        left: leftAmount,
        margin: `10px 0`,
        borderRadius: "20px",
      },
      init: {
        width: "100%",
        left: 0,
        margin: 0,
        borderRadius: "0px",
      },
    };

    return headerAnimateVaraints;
  };
  const [variants, setVariants] = React.useState<Variants>(
    calculateVariants(demension.offsetWidth)
  );

  React.useEffect(() => {
    onVariantsChanged(variants);
  }, [variants]);

  const latestScrollY = React.useRef(0);
  React.useEffect(() => {
    const onChangeHandler = (latestValue: number) => {
      if (latestScrollY.current != latestValue) {
        latestScrollY.current = latestValue;
        setVariants(calculateVariants(demension.offsetWidth));
      }
    };
    onChangeHandler(0);
    return scrollY.on("change", onChangeHandler);
  }, [demension.offsetWidth]);

  return variants;
};

export default useHeaderAnimationVariants;
