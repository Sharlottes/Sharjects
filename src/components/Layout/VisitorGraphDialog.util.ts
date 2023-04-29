const monthes = ["월", "화", "수", "목", "금", "토", "일"];
function parseDate(str: string): string {
  const date = new Date(
    `${str.slice(0, 4)} ${str.slice(4, 6)} ${str.slice(6, 8)}`
  );
  return `${date.getMonth() + 1}/${date.getDate()} (${
    monthes[date.getUTCDay()]
  })`;
}

namespace U {
  export const useVisitorGraphData = (visitors: Record<string, number>) => {
    const entries = Object.entries(visitors);
    return {
      datasets: [
        {
          type: "line" as const,
          label: "Dataset 1",
          data: entries
            .slice(Math.max(0, entries.length - 7))
            .map(([date, amount]) => ({ x: parseDate(date), y: amount })),
          borderColor: "green",
          borderWidth: 2,
        },
      ],
    };
  };
}

export default U;
