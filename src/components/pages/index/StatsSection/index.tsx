import React from "react";

import TitleBox from "../TitleBox";
import SpotifyStatus from "./SpotifyStatus";
import GithubStatus from "./GithubStatus";
import VscodeStatus from "./VscodeStatus";
import { StatsSectionContainer, StatusContainer } from "./styled";

const StatsSection: React.FC = () => (
  <StatsSectionContainer className="content">
    <TitleBox title="Stats" description="지금 이 사람의 여러 상태들은..." />
    <StatusContainer>
      <SpotifyStatus />
      <VscodeStatus />
      <GithubStatus />
    </StatusContainer>
  </StatsSectionContainer>
);

export default StatsSection;
