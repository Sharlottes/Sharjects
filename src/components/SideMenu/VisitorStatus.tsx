import React from "react";
import VisitorGraphDialog from "./VisitorGraphDialog";
import Box from "@mui/material/Box";

const dateCode = (() => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
})();

const VisitorStatus: React.FC = () => {
  const [visitors, setVisitors] = React.useState<Record<string, number>>();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => setVisitors(data));
  }, []);

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {!visitors ? (
        <>방문자 불러오는 중...</>
      ) : (
        <>
          이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고, 총{" "}
          {Object.values(visitors).reduce((a, e) => a + e, 0)}번 조회되었어요.
          <Box
            component="span"
            onClick={() => setDialogOpen(true)}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "skyblue" : "blue",
              cursor: "pointer",
            }}
          >
            그래프 보기
          </Box>
          <VisitorGraphDialog
            data={visitors}
            maxWidth="xs"
            fullWidth
            onClose={() => setDialogOpen(false)}
            open={dialogOpen}
          />
        </>
      )}
    </div>
  );
};
export default VisitorStatus;
