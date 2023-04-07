import React from "react";
import { useScroll } from "framer-motion";
import Mathf from "src/utils/Mathf";

const THRESHOLD = 300;

const useHeaderAlphaAmount = (onScrollChanged: () => void): number => {
  const [alphaAmount, setAlphaAmount] = React.useState(0);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const onChangeHandler = () => {
      onScrollChanged();
      setAlphaAmount(Mathf.clamp(scrollY.get() / THRESHOLD));
    };
    onChangeHandler();
    return scrollY.onChange(onChangeHandler);
  }, []);

  return alphaAmount;
};

export default useHeaderAlphaAmount;
