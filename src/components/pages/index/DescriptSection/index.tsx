import type { Variants } from "framer-motion";
import TitleBox from "../TitleBox";
import Content, { type ContentProps } from "./Content";
import { DescriptSectionContainer, ContentsBox } from "./styled";

const contentData: Omit<ContentProps, "toRight">[] = [
  {
    title: "타임라인",
    description:
      "개발 일대기를 시간 수직선으로 나열한 자동 수직 스크롤 타임라인",
    image: "/images/previews/timeline_preview.png",
    link: "/timeline",
  },
  {
    title: "프로젝트",
    description: "배포되었거나 즉시 사용 가능한 프로젝트가 준비돼있습니다!",
    image: "/images/previews/projects_preview.png",
    link: "/projects",
  },
  {
    title: "블로그",
    description: "다양한 블로그에 분산된 포스트들을 한눈에 조회하세요!",
    image: "/images/previews/blog_preview.png",
    link: "/blogs",
  },
];

const variation: Variants = {
  show: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 2.25 + i * 0.25,
      duration: i % 2 != 0 ? 1 : 1.25,
      ease: [0.79, -0.06, 0.19, 1.16],
    },
  }),
  shadow: (i) => ({
    boxShadow: "0 -50px 50px -50px #000",
    transition: {
      delay: 2.25 + i * 0.25 + (i % 2 != 0 ? 1 : 1.25),
    },
  }),
};

const DescriptSection: React.FC = () => (
  <DescriptSectionContainer>
    <TitleBox
      className="content"
      title="Contents"
      description="타임라인, 프로젝트, 블로그 등 여러가지 콘텐츠들을 확인하세요!"
      delay={2}
    />
    <ContentsBox>
      {contentData.map((data, i) => (
        <Content {...data} toRight={i % 2 != 0} key={i} custom={i} />
      ))}
    </ContentsBox>
  </DescriptSectionContainer>
);

export default DescriptSection;
