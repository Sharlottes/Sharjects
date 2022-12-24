import React from "react";
import Box from "@mui/material/Box";
import VisitorGraphDialog from "./VisitorGraphDialog";

const dateCode = (() => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
})();

const Status: React.FC = () => {
  const [visitors, setVisitors] = React.useState<Record<string, number>>();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => setVisitors(data));
  }, []);

  return (
    <Box
      sx={{
        marginLeft: "10px",
        fontSize: 12,
        fontWeight: 500,
        "& span": {
          display: "inline",
          color: "blue",
          cursor: "pointer",
        },
      }}
    >
      {!visitors ? (
        <>방문자 불러오는 중...</>
      ) : (
        <>
          이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고,
          <br />총 {Object.values(visitors).reduce((a, e) => a + e, 0)}번
          조회되었어요.
          <span onClick={() => setDialogOpen(true)}>그래프 보기</span>
          <VisitorGraphDialog
            data={visitors}
            maxWidth="xs"
            fullWidth
            onClose={() => setDialogOpen(false)}
            open={dialogOpen}
          />
        </>
      )}
    </Box>
  );
};
export default Status;
