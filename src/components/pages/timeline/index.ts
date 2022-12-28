export interface TimelineItemData {
  date: string;
  y: number;
}

export type ScrollDirectionType = "up" | "down";

export const MARGIN = 150;

export const scrollWindow = (y: number) =>
  window.scrollTo({ top: y, behavior: "smooth" });

export const getDist = (to: number, targetPos = window.scrollY) =>
  (targetPos ?? 0) - to;

let cachedItems: TimelineItemData[];
export const getTimelineItems = () => {
  if (cachedItems) return cachedItems;
  const datas: TimelineItemData[] = [];

  for (const element of document.querySelectorAll<HTMLDivElement>(
    "div #top-anchor, #bottom-anchor, .has-content"
  )) {
    datas.push({
      date:
        element.id === "top-anchor"
          ? "start"
          : element.id === "bottom-anchor"
          ? "end"
          : element.innerText,
      y: element.offsetTop,
    });
  }
  cachedItems = datas;
  return datas;
};

export const getNearestItem = (
  direction: "up" | "down" | "none" = "none"
): TimelineItemData => {
  const items = getTimelineItems();
  for (let i = 0; i < items.length; i++) {
    const item = items[direction === "up" ? items.length - 1 - i : i];
    if (
      Math.max(0, (direction === "up" ? -1 : 1) * (item.y - window.scrollY))
    ) {
      return item;
    }
  }
  return { date: "", y: window.scrollY };
};
