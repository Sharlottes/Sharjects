import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import styled from "@mui/system/styled";
import useSWR from "swr";

import { StatusCardContainer } from "./styled";

const VSCodeStatusContainer = styled("div")({
  minWidth: "100%",
  maxWidth: "300px",
});

const VSCodeStatusConent = styled("div")({
  display: "flex",
  alignItems: "center",
});

const VSCodeStatusTitle = styled(Typography)({
  "& > span": {
    wordBreak: "break-all",
  },
});
const VSCodingImage = styled("img")({
  width: "70px",
  height: "70px",
  borderRadius: "15px",
  margin: "0 10px 10px 0",
});

const VscodeStatus: React.FC = () => {
  const { data } = useSWR<VSCodeStatusData | undefined>(
    "/api/vscode/presence",
    fetchVisualStudioCodeStatsData
  );

  if (!data) return <></>;

  return (
    <StatusCardContainer>
      <Divider sx={{ margin: "10px 0" }} />
      {data && (
        <VSCodeStatusContainer>
          <VSCodeStatusConent>
            <VSCodingImage src="/images/vscodeing.png" />
            <div>
              <VSCodeStatusTitle>
                Working in
                <br />
                <span>{data.workspaceName}</span>
              </VSCodeStatusTitle>
              <Typography>
                line at
                {data.position.map((pos) =>
                  pos.start.line === pos.end.line &&
                  pos.start.char === pos.end.char
                    ? `${pos.start.line}:${pos.start.char}`
                    : `${pos.start.line}:${pos.start.char} ~ ${pos.end.line}:${pos.end.char}`
                )}
              </Typography>
            </div>
          </VSCodeStatusConent>
          {data.githubUrl && (
            <Button fullWidth href={data.githubUrl} variant="contained">
              go repository
            </Button>
          )}
        </VSCodeStatusContainer>
      )}
    </StatusCardContainer>
  );
};

async function fetchVisualStudioCodeStatsData(url: string) {
  const { item } = await fetch(url).then<{
    item: VSCodeStatusData | undefined;
  }>((data) => data.json());
  return item;
}

export default VscodeStatus;
