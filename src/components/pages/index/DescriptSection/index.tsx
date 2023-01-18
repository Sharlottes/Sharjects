import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Content, { ContentProps } from "./Content";
import { DescriptSectionContainer, TitleBox, ContentsBox } from "./styled";
import { motion } from "framer-motion";

const contentData: ContentProps[] = [
  {
    title: "타임라인",
    description:
      "개발 일대기를 시간 수직선으로 나열한 자동 수직 스크롤 타임라인",
    image: "/images/previews/timeline_preview.png",
    link: "/timeline",
    progress: "30%",
  },
  {
    title: "프로젝트",
    description: "배포되었거나 즉시 사용 가능한 프로젝트가 준비돼있습니다!",
    image: "/images/previews/projects_preview.png",
    link: "/projects",
    progress: "20%",
    canEnter: true,
  },
];

const DescriptSection: React.FC = () => (
  <DescriptSectionContainer>
    <TitleBox
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -30, opacity: 0 }}
      transition={{ delay: 2, duration: 1, type: "spring" }}
    >
      <Typography variant="h2" fontWeight="bold">
        Contents
      </Typography>
      <Typography variant="body2">
        타임라인, 프로젝트, 블로그 등 여러가지 콘텐츠들을 확인하세요!
      </Typography>
    </TitleBox>
    <Divider
      component={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 2.25, duration: 0.5 }}
    />
    <ContentsBox>
      {contentData.map((data, i) => (
        <Content
          {...data}
          key={i}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 30, opacity: 0 }}
          transition={{ delay: 2.25 + i * 0.25, duration: 1 }}
        />
      ))}
    </ContentsBox>
  </DescriptSectionContainer>
);

export default DescriptSection;
