export interface TimelineItemData {
  date: string;
  y: number;
}

export const MARGIN = 150;

export const getDist = (to: number, targetPos = window.scrollY) =>
  (targetPos ?? 0) - to;

export const getTimelineItems = () => {
  const datas: TimelineItemData[] = [];

  for (const element of document.querySelectorAll<HTMLDivElement>(
    "div #top-anchor, #bottom-anchor, .has-content"
  )) {
    datas.push({ date: element.innerText, y: element.offsetTop });
  }

  return datas;
};
