import Image from "next/image";

import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import Layout from "src/components/Layout";
import Content from "src/components/pages/index/Content";
import ProgressiveTypography from "src/components/ProgressiveTypography";

import { motion } from "framer-motion";
import * as styles from "src/components/pages/index/index.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <ProgressiveTypography
          className={styles.titleTypography}
          label="Sharlotte"
        />
        <Fade in style={{ transitionDelay: "1s" }}>
          <Divider>
            <Zoom in style={{ transitionDelay: "1s" }}>
              <Avatar sx={{ width: 60, height: 60 }}>
                <Image
                  src="/images/profile/sharlottes.png"
                  alt="avatar"
                  width={60}
                  height={60}
                />
              </Avatar>
            </Zoom>
          </Divider>
        </Fade>
        <div className={styles.keywordsContainer}>
          {keywords.map((keyword, i) => (
            <motion.p
              key={i}
              className={styles.keyword}
              initial={{ y: -150, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 1,
                  type: "spring",
                  delay: 1 + i * 0.25,
                },
              }}
            >
              {keyword}&nbsp;
            </motion.p>
          ))}
        </div>
      </div>
      <div className={styles.contentsBox}>
        {contentData.map((data, i) => (
          <Content {...data} key={i} custom={i} toright={i % 2 != 0} />
        ))}
      </div>
    </Layout>
  );
}

const keywords = [
  "다양한 분야를 탐구하고,",
  "최적화와 성능의 낭만을 쫒는,",
  "20세 대학생 개발자",
];

const contentData = [
  {
    title: "타임라인",
    description: "개발 일대기를 시간 축으로 나열한 자동 수직 스크롤 타임라인",
    link: "/timeline",
  },
  {
    title: "프로젝트",
    description: "여러가지 분야에 걸친 다양한 개발 프로젝트들의 목록",
    link: "/projects",
  },
  {
    title: "블로그",
    description: "다양한 블로그에 분산된 포스트들을 한 곳에서!",
    link: "/blogs",
  },
];
