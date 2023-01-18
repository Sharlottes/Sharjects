import React from "react";
import Layout from "src/components/Layout";
import styled from "@mui/system/styled";
import TitleSection from "src/components/pages/index/TitleSection";
import DescriptSection from "src/components/pages/index/DescriptSection";

const SectionContainer = styled("div")({
  width: "calc(100% - 10vw)",
  margin: "10vh 5vw 0",
});

const Home: React.FC = () => (
  <Layout>
    <SectionContainer>
      <TitleSection />
      <DescriptSection />
    </SectionContainer>
  </Layout>
);

export default Home;
