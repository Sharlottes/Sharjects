import styled from "@mui/system/styled";
import TitleBox from "../TitleBox";

const StatsSectionContainer = styled("div")({
  marginTop: "120px",
});

const StatsSection: React.FC = () => (
  <StatsSectionContainer>
    <TitleBox title="Stats" description="지금 이 사람은..." delay={3} />
  </StatsSectionContainer>
);

export default StatsSection;
