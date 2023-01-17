import React from "react";
import Layout from "src/components/Layout";
import styled from "@mui/system/styled";
import TitleSection from "src/components/pages/index/TitleSection";

const SectionContainer = styled("div")({
  width: "100%",
  marginTop: "10vh",
  marginLeft: "100px",
});

const Home: React.FC = () => (
  <Layout>
    <SectionContainer>
      <TitleSection />
    </SectionContainer>
  </Layout>
);

export default Home;
