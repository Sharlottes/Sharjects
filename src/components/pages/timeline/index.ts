export interface TimelineItemData {
  date: string;
  y: number;
}

export const MARGIN = 150;

export const getDist = (to: number, targetPos = window.scrollY) =>
  (targetPos ?? 0) - to;

let cachedItems: TimelineItemData[];
export const getTimelineItems = () => {
  if (cachedItems) return cachedItems;
  const datas: TimelineItemData[] = [];

  for (const element of document.querySelectorAll<HTMLDivElement>(
    "div #top-anchor, #bottom-anchor, .has-content"
  )) {
    datas.push({ date: element.innerText, y: element.offsetTop });
  }
  cachedItems = datas;
  return datas;
};
