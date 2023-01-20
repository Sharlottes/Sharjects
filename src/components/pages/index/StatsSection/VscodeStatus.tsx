import React from "react";

import Typography from "@mui/material/Typography";
import VisualStudioCodeIcon from "src/assets/icons/VisualStudioCodeIcon";
import { StatusCardContainer } from "./styled";
import Divider from "@mui/material/Divider";
import type { VSCodeStatusData } from "src/@types";
import Button from "@mui/material/Button";

const dummy = {
  item: {
    workspaceName: "SharBot\\src\\index.ts",
    position: [
      {
        start: {
          char: 4,
          line: 21,
        },
        end: {
          char: 4,
          line: 21,
        },
      },
    ],
    githubUrl: "https://github.com/Sharlottes/SharBot",
  },
};

const VscodeStatus: React.FC = () => {
  const [data, setData] = React.useState<VSCodeStatusData>(dummy.item);
  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/vscode/presence").then<{
        item: VSCodeStatusData | undefined;
      }>((data) => data.json());
      console.log(res);
      if (res.item) setData(res.item);
    })();
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
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/vscodeing.png"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "15px",
                margin: "0 10px 10px 0",
              }}
            />
            <div>
              <Typography>Working in {data.workspaceName}</Typography>
              <Typography>
                line at{" "}
                {data.position.map(
                  (pos) =>
                    `${pos.start.line}:${pos.start.char} ~ ${pos.end.line}:${pos.end.char}`
                )}
              </Typography>
            </div>
          </div>
          {data.githubUrl && (
            <Button fullWidth href={data.githubUrl} variant="contained">
              go repository
            </Button>
          )}
        </>
      )}
    </StatusCardContainer>
  );
};

export default VscodeStatus;
