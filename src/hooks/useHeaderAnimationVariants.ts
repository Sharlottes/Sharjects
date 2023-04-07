import React from "react";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

import type { Variants } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const useHeaderAnimationVariants = (
  onVariantsChanged: () => void
): Variants => {
  const isMobile = useMediaQuery("sm");
  const demension = useWindowDimensions();
  const headerAnimateVaraints = React.useMemo<Variants>(() => {
    const width = demension.offsetWidth;
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

    onVariantsChanged();

    return headerAnimateVaraints;
  }, [demension.offsetWidth]);

  return headerAnimateVaraints;
};

export default useHeaderAnimationVariants;
