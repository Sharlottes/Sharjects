import ProgressiveTypography from "src/components/ProgressiveTypography";
import Center from "src/components/utils/Center";
import Content from "./Content";

import contentData from "public/data/contentData.json";
import S from "./DescriptSection.styled";

const DescriptSection: React.FC = () => (
  <S.DescriptSectionContainer>
    <Center className="content">
      <ProgressiveTypography
        textAlign="center"
        variant="h2"
        fontWeight="bold"
        label="Contents"
        delay={2}
      />
    </Center>
    <S.ContentsBox>
      {contentData.map((data, i) => (
        <Content {...data} key={i} custom={i} toright={i % 2 != 0} />
      ))}
    </S.ContentsBox>
  </S.DescriptSectionContainer>
);

export default DescriptSection;
