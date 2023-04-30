import SpotifyStatus from "./SpotifyStatus";
import GithubStatus from "./GithubStatus";
import VscodeStatus from "./VscodeStatus";
import Typography from "@mui/material/Typography";
import Center from "src/components/utils/Center";

import S from "./StatsSection.styled";

const StatsSection: React.FC = () => (
  <S.StatsSectionContainer className="content">
    <Center>
      <Typography variant="h2" fontWeight="bold">
        Stats
      </Typography>
    </Center>
    <S.StatusContainer>
      <SpotifyStatus />
      <VscodeStatus />
      <GithubStatus />
    </S.StatusContainer>
  </S.StatsSectionContainer>
);

export default StatsSection;
