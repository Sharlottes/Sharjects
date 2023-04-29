import ProgressiveTypography from "src/components/ProgressiveTypography";
import Content, { type ContentProps } from "./Content";
import { DescriptSectionContainer, ContentsBox } from "./styled";
import Center from "src/components/utils/Center";

const contentData: Omit<ContentProps, "toright">[] = [
  {
    title: "타임라인",
    description: "개발 일대기를 시간 축으로 나열한 자동 수직 스크롤 타임라인",
    image: "/images/previews/timeline_preview.png",
    link: "/timeline",
  },
  {
    title: "프로젝트",
    description: "여러가지 분야에 걸친 다양한 개발 프로젝트들의 목록",
    image: "/images/previews/projects_preview.png",
    link: "/projects",
  },
  {
    title: "블로그",
    description: "다양한 블로그에 분산된 포스트들을 한 곳에서!",
    image: "/images/previews/blog_preview.png",
    link: "/blogs",
  },
];

const DescriptSection: React.FC = () => (
  <DescriptSectionContainer>
    <Center className="content">
      <ProgressiveTypography
        boxProps={{
          sx: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& h2": {
              transition: "margin 1s cubic-bezier(1,-1.56,0,2.03)",
              margin: "0px",
            },
            "&:hover": {
              "& h2": {
                margin: "0 30px",
              },
            },
          },
        }}
        textAlign="center"
        variant="h2"
        fontWeight="bold"
        label="Contents"
        delay={2}
      />
    </Center>
    <ContentsBox>
      {contentData.map((data, i) => (
        <Content
          {...data}
          initial={{
            x: "150%",
            opacity: 0,
          }}
          animate={{
            x: i % 2 == 0 ? "-1%" : "1%",
            opacity: 1,
          }}
          transition={{
            delay: 2.25 + i * 0.25,
            duration: i % 2 != 0 ? 1 : 1.25,
            ease: [0.79, -0.06, 0.19, 1.16],
          }}
          key={i}
          toright={i % 2 != 0}
        />
      ))}
    </ContentsBox>
  </DescriptSectionContainer>
);

export default DescriptSection;
