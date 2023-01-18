import { Divider, IconButton, Link } from "@mui/material";
import PreviewDialog from "./PreviewDialog";
import { EnterButtonContainer } from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import styled from "@mui/system/styled";

const ContentStatsWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    boxShadow: "0 0 5px 5px",
    clipPath:
      "polygon(80% 100%, 100% 20px, 30% 0, 31% -10%, 0 -10%, 0 0, 0 80%, 20px 100%)",

    borderRadius: "0 0 20px 20px",
  },
}));

const ContentStatsContainer = styled("div")({
  width: "100%",
  display: "flex",
  gap: "30px",
  paddingTop: "20px",
  paddingLeft: "20px",
  textAlign: "center",
  whiteSpace: "nowrap",
});

export interface ContentStatsProps {
  link: string;
  progress: string;
  canEnter?: boolean;
  developing?: boolean;
}
const ContentStats: React.FC<ContentStatsProps> = ({
  link,
  progress,
  canEnter = false,
  developing = false,
}) => (
  <ContentStatsWrapper>
    <ContentStatsContainer>
      <div>
        현재 진행률
        <Divider />
        {progress}
      </div>
      <div>
        입장 {canEnter ? "가능!" : "불가능"}
        <Divider />
        <EnterButtonContainer>
          <IconButton disabled={!canEnter}>
            <Link href={link}>
              {canEnter ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )}
            </Link>
          </IconButton>
          <PreviewDialog disabled={!canEnter} url={link} />
        </EnterButtonContainer>
      </div>
      <div>
        {developing ? "개발중" : "개발 대기중"}
        <Divider />
      </div>
    </ContentStatsContainer>
  </ContentStatsWrapper>
);

export default ContentStats;
