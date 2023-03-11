import KeywordShower from "./KeywordShower";
import MainTitle from "./MainTitle";
import MainTitleAvatar from "./MainTitleAvatar";

const TitleSection: React.FC = () => (
  <div className="content">
    <MainTitle />
    <MainTitleAvatar />
    <KeywordShower />
  </div>
);

export default TitleSection;
