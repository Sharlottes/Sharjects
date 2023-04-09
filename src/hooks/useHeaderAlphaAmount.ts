import React from "react";
import { useScroll } from "framer-motion";
import Mathf from "src/utils/Mathf";

const THRESHOLD = 300;

const useHeaderAlphaAmount = (): number => {
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

export default useHeaderAlphaAmount;
