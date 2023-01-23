import React from "react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { KeywordShowerContainer } from "./styled";

const keywords = [
  "19세 고등학생",
  ", 잡다한 개발자",
  ", 최적화와 성능의 낭만을 쫒는",
  ", 학생 개발자",
];

const KeywordShower: React.FC = () => (
  <KeywordShowerContainer>
    {keywords.map((keyword, i) => (
      <motion.div
        key={i}
        custom={i}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", delay: 1 + i * 0.25 }}
        initial={{ y: -50, opacity: 0 }}
      >
        <Typography>{keyword}</Typography>
      </motion.div>
    ))}
  </KeywordShowerContainer>
);

export default KeywordShower;
