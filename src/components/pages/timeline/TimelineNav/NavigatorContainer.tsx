import React from "react";
import NavigatorShowButton from "./NavigatorShowButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import Layouts from "src/core/Layouts";

const NavigatorContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [showed, setShowed] = React.useState(false);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "calc(50%, fit-content)",
        padding: "10px",
        height: "fit-content",
        boxShadow: "0 0 10px black",
        borderRadius: "10px",
        backgroundColor: "white",
        zIndex: Layouts.SIDE_MENU - 1,
        transform: "translateX(-110px)",
      }}
      animate={{ x: showed ? 0 : -110 }}
    >
      <NavigatorShowButton
        showed={showed}
        onClick={() => setShowed((prev) => !prev)}
      >
        <ArrowForwardIosIcon />
      </NavigatorShowButton>
      {children}
    </motion.div>
  );
};

export default NavigatorContainer;
