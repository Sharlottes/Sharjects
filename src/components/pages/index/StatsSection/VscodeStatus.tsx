import React from "react";

import Typography from "@mui/material/Typography";
import VisualStudioCodeIcon from "src/assets/icons/VisualStudioCodeIcon";
import { StatusCardContainer } from "./styled";
import Divider from "@mui/material/Divider";
import type { VSCodeStatusData } from "src/@types";
import Button from "@mui/material/Button";
import styled from "@mui/system/styled";

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
  const [data, setData] = React.useState<VSCodeStatusData>();
  React.useEffect(() => {
    fetch("/api/vscode/presence")
      .then<{
        item: VSCodeStatusData | undefined;
      }>((data) => data.json())
      .then((res) => setData(res.item));
  }, []);

  return (
    <StatusCardContainer>
      <div>
        <VisualStudioCodeIcon
          sx={{ transform: "scale(1.5)", marginRight: "10px" }}
        />
        <Typography component="span" variant="h4">
          Vscode
        </Typography>
      </div>
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

export default VscodeStatus;
