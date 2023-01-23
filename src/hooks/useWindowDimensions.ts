import { useState, useEffect } from "react";

type DimensionType = Pick<
  typeof window,
  "innerWidth" | "innerHeight" | "outerWidth" | "outerHeight"
> &
  Pick<
    (typeof document)["body"],
    "clientWidth" | "clientHeight" | "offsetWidth" | "offsetHeight"
  >;

const getWindowDimensions = (): DimensionType => {
  const { clientWidth, clientHeight, offsetWidth, offsetHeight } =
    document.body;
  const { innerWidth, outerWidth, innerHeight, outerHeight } = window;
  return {
    clientWidth,
    clientHeight,
    offsetWidth,
    offsetHeight,
    innerWidth,
    outerWidth,
    innerHeight,
    outerHeight,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<DimensionType>({
    clientWidth: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    innerWidth: 0,
    outerWidth: 0,
    innerHeight: 0,
    outerHeight: 0,
  });

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
