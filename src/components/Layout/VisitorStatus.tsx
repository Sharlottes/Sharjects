import useSWR from "swr";

const dateCode = (() => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
})();

const VisitorStatus: React.FC = () => {
  const { data: visitors, isLoading } =
    useSWR<Record<string, number>>("/api/visit");

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {!visitors || isLoading ? (
        <>방문자 불러오는 중...</>
      ) : (
        <>
          이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고, 총{" "}
          {Object.values(visitors).reduce((a, e) => a + e, 0)}번 조회되었어요.
        </>
      )}
    </div>
  );
};
export default VisitorStatus;
