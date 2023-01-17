import React from "react";
import Layout from "src/components/Layout";
import { MainTitle, KeywordShower } from "src/components/pages/index";
import styled from "@mui/system/styled";
import MainTitleAvatar from "src/components/pages/index/MainTitleAvatar";

const TitleSection = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "min-content auto",
  gap: "10px 20px",
  marginTop: "10vh",
  marginLeft: "100px",
});

const Home: React.FC = () => (
  <Layout>
    <TitleSection>
      <MainTitle />
      <MainTitleAvatar />
      <KeywordShower />
    </TitleSection>
  </Layout>
);

export default Home;
