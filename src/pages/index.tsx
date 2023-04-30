import Layout from "src/components/Layout";
import styled from "@mui/system/styled";
import TitleSection from "src/components/pages/index/TitleSection/TitleSection";
import DescriptSection from "src/components/pages/index/DescriptSection/DescriptSection";
import StatsSection from "src/components/pages/index/StatsSection/StatsSection";

const SectionContainer = styled("div")({
  "& .content": {
    margin: "10vh 5vw 0",
  },
});

const Home: React.FC = () => (
  <Layout>
    <SectionContainer>
      <TitleSection />
      <DescriptSection />
      <StatsSection />
    </SectionContainer>
  </Layout>
);

export default Home;
