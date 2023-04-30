import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ProgressiveTypography from "src/components/ProgressiveTypography";

import S from "./TitleSection.styled";
import Center from "src/components/utils/Center";
import Image from "next/image";

const keywords = [
  "다양한 분야를 탐구하고",
  "최적화와 성능의 낭만을 쫒는",
  "20세 대학생 개발자",
];

const TitleSection: React.FC = () => (
  <div className="content">
    <Center>
      <ProgressiveTypography
        variant="h1"
        label="Sharlotte"
        fontWeight="bold"
        fontSize="max(4rem, 10vw)"
      />
    </Center>
    <Divider
      component={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        delay: 1,
        duration: 0.25,
      }} //TODO: add "fade in", "fade out" global util variants
    >
      <motion.div
        animate={{ y: 0, scale: 1 }}
        initial={{ y: -20, scale: 0 }}
        transition={{
          type: "spring",
          delay: 1,
          duration: 0.5,
        }}
      >
        <Avatar sx={{ width: 60, height: 60 }}>
          <Image
            src="/images/profile/sharlottes.png"
            alt="avatar"
            width={60}
            height={60}
          />
        </Avatar>
      </motion.div>
    </Divider>
    <S.KeywordShowerContainer>
      {keywords.map((keyword, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", delay: 1 + i * 0.25 }}
          initial={{ y: -150, opacity: 0 }}
        >
          <Typography>
            {keyword}
            {keywords.length != i + 1 && <>,&nbsp;</>}
          </Typography>
        </motion.div>
      ))}
    </S.KeywordShowerContainer>
  </div>
);

export default TitleSection;
