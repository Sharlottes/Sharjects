import Content from "./Content";

import contentData from "public/data/contentData.json";
import S from "./DescriptSection.styled";

const DescriptSection: React.FC = () => (
  <S.DescriptSectionContainer>
    <S.ContentsBox>
      {contentData.map((data, i) => (
        <Content {...data} key={i} custom={i} toright={i % 2 != 0} />
      ))}
    </S.ContentsBox>
  </S.DescriptSectionContainer>
);

export default DescriptSection;
