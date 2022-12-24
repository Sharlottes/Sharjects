import React from "react";

import { motion, useAnimationControls } from "framer-motion";

import KeywordShower from "./KeywordShower";

const MainDescription: React.FC = () => {
  const controller = useAnimationControls();

  return (
    <motion.div
      onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
        if (ev.detail >= 2) controller.start({ x: 0, y: 0 });
      }}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      transition={{ delay: 1 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "max(17px, 4vw)",
        width: "100vw",
      }}
    >
      <span>안녕하세요! 저는</span>
      <KeywordShower
        animate={controller}
        drag
        style={{
          height: "1em",
          display: "inline",
          width: "5em",
          textAlign: "center",
        }}
      />
      <span>입니다.</span>
    </motion.div>
  );
};

export default MainDescription;
