import { styled } from "@mui/material/styles";
import KeywordShower from "./KeywordShower";
import MainTitle from "./MainTitle";
import MainTitleAvatar from "./MainTitleAvatar";

const TitleSectionContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "min-content auto",
  gap: "10px 20px",
});

const TitleSection: React.FC = () => (
  <TitleSectionContainer>
    <MainTitle />
    <MainTitleAvatar />
    <KeywordShower />
  </TitleSectionContainer>
);

export default TitleSection;
