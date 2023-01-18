import { styled } from "@mui/material/styles";
import KeywordShower from "./KeywordShower";
import MainTitle from "./MainTitle";
import MainTitleAvatar from "./MainTitleAvatar";

const TitleSection: React.FC = () => (
  <div>
    <MainTitle />
    <MainTitleAvatar />
    <KeywordShower />
  </div>
);

export default TitleSection;
