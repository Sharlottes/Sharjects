import React from "react";

import TitleBox from "../TitleBox";
import SpotifyStatus from "./SpotifyStatus";
import GithubStatus from "./GithubStatus";
import VscodeStatus from "./VscodeStatus";
import S from "./styled";

const StatsSection: React.FC = () => (
  <S.StatsSectionContainer className="content">
    <TitleBox title="Stats" description="지금 이 사람의 여러 상태들은..." />
    <S.StatusContainer>
      <SpotifyStatus />
      <VscodeStatus />
      <GithubStatus />
    </S.StatusContainer>
  </S.StatsSectionContainer>
);

export default StatsSection;
