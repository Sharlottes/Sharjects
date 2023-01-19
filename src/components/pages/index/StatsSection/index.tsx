import React from "react";

import styled from "@mui/system/styled";
import TitleBox from "../TitleBox";
import SpotifyStatus from "./SpotifyStatus";

const StatusContainer = styled("div")({
  display: "flex",
  gap: "30px",
});

const StatsSectionContainer = styled("div")({
  marginTop: "120px",
});

const StatsSection: React.FC = () => (
  <StatsSectionContainer>
    <TitleBox title="Stats" description="지금 이 사람의 여러 상태들은..." />
    <StatusContainer>
      <SpotifyStatus />
    </StatusContainer>
  </StatsSectionContainer>
);

export default StatsSection;
