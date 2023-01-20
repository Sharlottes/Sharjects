import React from "react";

import TitleBox from "../TitleBox";
import SpotifyStatus from "./SpotifyStatus";
import VscodeStatus from "./VscodeStatus";
import { StatsSectionContainer, StatusContainer } from "./styled";

const StatsSection: React.FC = () => (
  <StatsSectionContainer>
    <TitleBox title="Stats" description="지금 이 사람의 여러 상태들은..." />
    <StatusContainer>
      <SpotifyStatus />
      <VscodeStatus />
    </StatusContainer>
  </StatsSectionContainer>
);

export default StatsSection;
