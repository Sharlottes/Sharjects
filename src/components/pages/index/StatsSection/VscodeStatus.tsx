import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useSWR from "swr";

import S from "./VscodeStatus.styled";

const VscodeStatus: React.FC = () => {
  const { data } = useSWR<{ item: VSCodeStatusData | undefined }>(
    "/api/vscode/presence"
  );

  if (!data?.item) return <></>;
  const { item } = data;

  return (
    <S.VSCodeStatusContainer>
      <S.VSCodeStatusConent>
        <S.VSCodingImage src="/images/vscodeing.png" />
        <div>
          <S.VSCodeStatusTitle>
            Working in
            <br />
            <span>{item.workspaceName}</span>
          </S.VSCodeStatusTitle>
          <Typography>
            line at
            {item.position.map((pos) =>
              pos.start.line === pos.end.line && pos.start.char === pos.end.char
                ? `${pos.start.line}:${pos.start.char}`
                : `${pos.start.line}:${pos.start.char} ~ ${pos.end.line}:${pos.end.char}`
            )}
          </Typography>
        </div>
      </S.VSCodeStatusConent>
      {item.githubUrl && (
        <Button fullWidth href={item.githubUrl} variant="contained">
          go repository
        </Button>
      )}
    </S.VSCodeStatusContainer>
  );
};

export default VscodeStatus;
